import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import connectDB from "./config/db.js";

dotenv.config();

const seedUsers = async () => {
  await connectDB();
  try {
    // Define default users
    const defaultUsers = [
      {
        name: "Admin User",
        email: "admin@civic.com",
        password: "admin123",
        role: "admin",
      },
      {
        name: "Worker User",
        email: "worker@civic.com",
        password: "worker123",
        role: "worker",
        assignedCategory: "Pothole",
      },
      {
        name: "Test Citizen",
        email: "user@civic.com",
        password: "user123",
        role: "citizen",
      },
    ];

    // Create users
    for (const userData of defaultUsers) {
      const userExists = await User.findOne({ email: userData.email });
      if (userExists) {
        console.log(`${userData.role} (${userData.email}) already exists.`);
        continue;
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      await User.create({
        ...userData,
        password: hashedPassword,
      });

      console.log(`✅ ${userData.role} created: ${userData.email}`);
    }

    console.log("\n🎉 Database seeded successfully!");
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

seedUsers();


