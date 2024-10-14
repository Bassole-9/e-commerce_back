import {Schema,model} from "mongoose"

const CommandSchema = new Schema({
  nom: {
    type: String,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
});

const commandSchema = new Schema(
  {
    total: {
      type: Number,
      required: true,
    },
    objet: {
      type: [CommandSchema],
      required: true,
    },
    userId: {
      type:String,
      required:true,
    },
    annuler: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
export default model("Command", commandSchema);
