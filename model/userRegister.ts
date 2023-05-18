import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser {
  isModified(arg0: string): unknown;
  name: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }

});

userSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const Usermodel = mongoose.model<IUser>('user', userSchema);

export default Usermodel;
