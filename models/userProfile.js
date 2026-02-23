import mongoose from "mongoose";

// user project schema
const userProjectSchema = mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
    },
    projectFromDate:{
        type: Date,
        required: true,
    },
    projectEndDate:{
        type: Date,
        required: true,
    },
    projectDescription: {
      type: String,
      required: true,
    },
    projectImage:{
        type: String,
        default: "https://img.freepik.com/premium-vector/project-management-icon-vector-illustration_53876-138827.jpg?semt=ais_hybrid&w=740&q=80",
    },
    projectBio:{
        type: String,
        default: "This is my website bio",
    },
    projectUrl: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

// user experience schema
const userExperienceSchema = mongoose.Schema(
  {
    experienceCompany: {
      type: String,
      required: true,
    },
    experiencePosition: {
      type: String,
      required: true,
    },
    experienceType:{
        type: String,
        default: "full-time",
    },
    experienceStartDate: {
      type: Date,
      required: true,
    },
    experienceEndDate: {
      type: Date,
      default: null,
    },
    experienceLocation:{
        type: String,
        default: "",
    },
    experienceWorkType: {
        type: String,
        default: "remote",
    },
    experienceDescription: {
      type: String,
      default: "",
    },
    experienceImages:{
        type: [String],
        default: [
            "https://img.freepik.com/premium-vector/experience-icon-vector-illustration_53876-138826.jpg?semt=ais_hybrid&w=740&q=80",
        ],
    }
  },
  { _id: false },
);

// user achievement schema
const userAchievementSchema = mongoose.Schema(
  {
    achievementImage:{
        type: String,
        default: "https://img.freepik.com/premium-vector/achievement-icon-vector-illustration_53876-138825.jpg?semt=ais_hybrid&w=740&q=80",
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    date: {
        type: Date,
        required: true,
    },
  },
  { _id: false },
);

// user link schema
const userLinkSchema = mongoose.Schema(
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
    portfolioUrl: {
      type: String,
      default: "",
    },
  }, { _id: false }
);

// contact schema
const userContactSchema = mongoose.Schema(
    {
        email: {
            type: String,
            default: "",
        },
        phone: {
            type: String,
            default: "",
        },
        address: {
            type: String,
            default: "",
        },
    },
    { _id: false }
);


// user profile schema
const userProfileSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // id, fullName, email, password, role
      required: true,
    },
     fullName:{
        type: String,
        require: true,
        minLength:4,
        maxLength:55,
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
    about: {
      type: String,
      default: "This is my about section",
    },
    skills: {
      type: [String],
      default: [],
    },
    education: {
      type: [String],
      default: [],
    },
    languagesKnown: {
      type: [String],
      default: [],
    },
    expectdSalary: {
      type: Number,
      default: 0,
    },
    noticePeriod: {
      type: Number,
      default: 0,
    },
    workType: {
      type: [String],
      default: [],
    },
    projects: {
      type: [userProjectSchema],
      default: [],
    },
    experience: {
      type: [userExperienceSchema],
      default: [],
    },
    achievements: {
      type: [userAchievementSchema],
      default: [],
    },
    resourceLinks: {
      type: userLinkSchema,
      default: {},
    },
    contact: {
      type: userContactSchema,
      default: {},
    },
  },
  { timestamps: true },
);

const UserProfile = mongoose.model("UserProfile", userProfileSchema);
export default UserProfile;
