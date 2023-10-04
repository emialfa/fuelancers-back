import * as mongoose from 'mongoose';

export const ListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  iso: { type: String },
  flag: { type: String },
});
