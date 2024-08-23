import mongoose from "mongoose";

const weakTopicSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
   subject: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const WeakTopic =
  mongoose.models.weakTopic || mongoose.model("weakTopic", weakTopicSchema);

export default WeakTopic;
