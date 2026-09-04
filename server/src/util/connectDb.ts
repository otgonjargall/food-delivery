import mongoose from "mongoose";

const URI = process.env.MONGODB_URI;

export const connectDb = async () => {
  try {
    if (!URI) {
      console.log(" MONGODB_URI BAIHGUI BN");
      return;
    }

    console.log("🔄 MongoDB holbogdoj baina...");

    await mongoose.connect(URI);

    console.log(" DB TEI AMJILTTAI HOLBOLDLOO");
  } catch (error) {
    console.log(" BD TEI HOLBOGDOHOD ALDAA GARLAA");
    console.error(error);
  }
};
