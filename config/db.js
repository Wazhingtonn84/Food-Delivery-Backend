import mongoose from "mongoose";

export const connectDB = async () => {
	await mongoose
		.connect(
			"mongodb+srv://wazhingtonn84:3344556677@cluster0.d1x3kox.mongodb.net/food-del"
		)
		.then(() => console.log("DB Connected"));
};
