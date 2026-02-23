import mongoose from "mongoose";


// company links schema
const companyLinksSchema = mongoose.Schema(
    {
        linkedinUrl: {
            type: String,
            default: "",
        },
        gitHubUrl: {
            type: String,
            default: "",
        },
        twitterUrl: {
            type: String,
            default: "",
        },
        websiteUrl: {
            type: String,
            default: "",
        },
        }, { _id: false }
);

// job post schema
const jobPostSchema = mongoose.Schema(
    {
        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            default: new mongoose.Types.ObjectId(),
        },
        jobImage: {
      type: String,
      default:
        "https://img.freepik.com/premium-vector/user-profile-icon-circle_1256048-12499.jpg?semt=ais_hybrid&w=740&q=80",
    },
        jobTitle: {
            type: String,
            required: true,
        },
        jobDescription: {
            type: String,
            required: true,
        },
        jobLocation: {
            type: String,
            required: true,
        },
        jobType: {
            type: String,
            enum: ["Full-time", "Part-time", "Contract", "Internship"],
            required: true,
        },
        workType:{
            type: String,
            enum: ["Remote", "On-site", "Hybrid"],
            required: true,
        },
        salaryRange: {
            type: Number,
            required: true,
        },
        requiredExperience: {
            type: String,
            required: true,
        },
        requiredSkills: {
            type: [String],
            required: true,
        }
    }, { _id: false }
);

const recruiterProfileSchema = new mongoose.Schema(
  {
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // id, email, password, role
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 55,
      default: "Your Name",
    },
    profileImage: {
      type: String,
      default:
        "https://img.freepik.com/premium-vector/user-profile-icon-circle_1256048-12499.jpg?semt=ais_hybrid&w=740&q=80",
    },
    bgImage: {
      type: String,
      default:
        "https://www.creativefabrica.com/wp-content/uploads/2019/02/User-icon-EPS10-by-Kanggraphic.jpg",
    },
     headLine: {
      type: String,
      default: "This is my headline",
    },
    companylocation:{
        type: String,
        default: "Company Location",
    },
    companySize: {
      type: Number,
      default: 0,
    },
    companyType: {
      type: String,
      enum: ["Startup", "SME", "Enterprise"],
      default: "Startup",
    },
    companyDescription: {
      type: String,
      default: "This is a brief description of the company.",
    },
    companyMission: {
      type: String,
      default: "Our mission is to build amazing products and create value for our customers.",
    },
    workCulture: {
      type: String,
      default: "We foster a collaborative and inclusive work culture where everyone is encouraged to share their ideas and contribute to the company's success.",
    },
    whatWeBuild: {
        type: String,
        default: "We build innovative software solutions that solve real-world problems and make a positive impact on people's lives.",
    },
    foundedYear: {
      type: Number,
      default: new Date().getFullYear(),
    },
    socialLinks: {
        type: companyLinksSchema,
        default: {},
    },
    jobPosts: {
        type: [jobPostSchema],
        default: [],
    },
    activelyHiring: {
        type: Boolean,
        default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const RecruiterProfile = mongoose.model(
  "RecruiterProfile",
  recruiterProfileSchema,
);
