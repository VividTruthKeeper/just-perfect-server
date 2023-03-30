import { Schema, Document, model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUserInput extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  token: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentInfo?: {
    cardHolderName: string;
    cardNumber: string;
    expirationDate: string;
    cvv: string;
  };
}

export interface IUserDocument extends IUserInput, Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema<IUserInput>(
  {
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentInfo: {
      cardHolderName: { type: String, required: false },
      cardNumber: { type: String, required: false },
      expirationDate: { type: String, required: false },
      cvv: { type: String, required: false },
    },
    __v: { type: Number, select: false },
  },
  { timestamps: true, strictQuery: false }
);

UserSchema.index({ email: 1 });

UserSchema.pre("save", async function (this: IUserDocument, next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hashSync(this.password, salt);

  this.password = hash;

  return next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as IUserDocument;
  return bcrypt.compare(candidatePassword, user.password).catch((_e) => false);
};

export default model<IUserDocument>("User", UserSchema);
