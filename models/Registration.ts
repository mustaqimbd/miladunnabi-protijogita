import mongoose from 'mongoose';

const RegistrationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  whatsapp: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: '',
  },
  division: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  upazila: {
    type: String,
    required: true,
  },
  currentAddress: {
    type: String,
    required: true,
  },
  identity: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  institution: {
    type: String,
    default: '',
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  senderNumber: {
    type: String,
    required: true,
  },
  transactionId: {
    type: String,
    default: '',
  },

  isSynced: {
    type: Boolean,
    default: false,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending',
  },
  serialNumber: {
    type: String,
    default: '',
  },
  adminNotes: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
  strict: false,
});

delete mongoose.models.Registration;
export default mongoose.model('Registration', RegistrationSchema);
