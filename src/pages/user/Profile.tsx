/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import {
  Profile,
  Edit,
  Camera,
  Call,
  Sms,
  Location,
  Calendar,
  Lock,
  Eye,
  EyeSlash,
  Notification,
  Global,
  Setting2,
  Trash,
  TickCircle,
  InfoCircle,
  Shield,
  ArrowLeft,
  Crown,
  Star1,
  SecurityUser,
} from "iconsax-react";
import Button from "@/components/Button";
import { Logo } from "@/components/ui/logo";
import { Input } from "@/components/Input";
import SpinLoader from "@/components/SpinLoader";
import { useToast } from "@/context/toast-context";

// Domain models - think of these as the profile management system
interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  preferences: {
    currency: string;
    language: string;
    timeZone: string;
    roomType: string;
    smokingPreference: "non-smoking" | "smoking" | "no-preference";
    specialRequests: string;
  };
  profileImage?: string;
  memberSince: string;
  loyaltyTier: "Bronze" | "Silver" | "Gold" | "Platinum";
}

interface CommunicationPreferences {
  emailNotifications: {
    bookingConfirmations: boolean;
    promotionalOffers: boolean;
    travelReminders: boolean;
    newsletter: boolean;
  };
  smsNotifications: {
    bookingUpdates: boolean;
    checkInReminders: boolean;
    emergencyAlerts: boolean;
  };
  pushNotifications: {
    specialDeals: boolean;
    priceDrops: boolean;
    reviewReminders: boolean;
  };
}

interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface FormErrors {
  [key: string]: string;
}

const UserProfile: React.FC = () => {
  const { success, error, info } = useToast();

  // State management - like managing guest information at hotel front desk
  const [activeTab, setActiveTab] = useState<
    "personal" | "preferences" | "security" | "privacy"
  >("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Mock user data - in real app, this would come from API
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: "usr_001",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15",
    address: {
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      country: "United States",
      zipCode: "10001",
    },
    preferences: {
      currency: "USD",
      language: "English",
      timeZone: "EST",
      roomType: "King Bed",
      smokingPreference: "non-smoking",
      specialRequests: "High floor, quiet room",
    },
    profileImage:
      "	https://ix-marketing.imgix.net/focalpoint.png?auto=format,compress&w=1946",
    memberSince: "2023-01-15",
    loyaltyTier: "Gold",
  });

  const [communicationPrefs, setCommunicationPrefs] =
    useState<CommunicationPreferences>({
      emailNotifications: {
        bookingConfirmations: true,
        promotionalOffers: true,
        travelReminders: true,
        newsletter: false,
      },
      smsNotifications: {
        bookingUpdates: true,
        checkInReminders: true,
        emergencyAlerts: true,
      },
      pushNotifications: {
        specialDeals: false,
        priceDrops: true,
        reviewReminders: true,
      },
    });

  const [passwordData, setPasswordData] = useState<PasswordChangeData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // Helper functions
  const handleGoHome = () => {
    window.location.href = "/";
  };

  const handleGoToDashboard = () => {
    window.location.href = "/dashboard";
  };

  const getLoyaltyTierColor = (tier: string) => {
    switch (tier) {
      case "Bronze":
        return "text-amber-600 bg-amber-100";
      case "Silver":
        return "text-gray-600 bg-gray-100";
      case "Gold":
        return "text-yellow-600 bg-yellow-100";
      case "Platinum":
        return "text-purple-600 bg-purple-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getLoyaltyIcon = (tier: string) => {
    switch (tier) {
      case "Platinum":
        return <Crown color="#9333EA" size={16} />;
      default:
        return <Star1 color="#CA8A04" size={16} variant="Bold" />;
    }
  };

  // Form handlers
  const handleProfileUpdate = (field: string, value: string) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setUserProfile((prev) => ({
        ...prev,
        [parent]:
          typeof prev[parent as keyof UserProfile] === "object" &&
          prev[parent as keyof UserProfile] !== null
            ? {
                ...(prev[parent as keyof UserProfile] as object),
                [child]: value,
              }
            : { [child]: value },
      }));
    } else {
      setUserProfile((prev) => ({
        ...prev,
        [field]: value,
      }));
    }

    // Clear any existing errors
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleCommunicationPrefUpdate = (
    category: string,
    setting: string,
    value: boolean
  ) => {
    setCommunicationPrefs((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof CommunicationPreferences],
        [setting]: value,
      },
    }));
  };

  const handlePasswordChange = (
    field: keyof PasswordChangeData,
    value: string
  ) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));

    if (field === "newPassword") {
      calculatePasswordStrength(value);
    }

    // Clear errors
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (password.match(/[a-z]/)) strength += 1;
    if (password.match(/[A-Z]/)) strength += 1;
    if (password.match(/[0-9]/)) strength += 1;
    if (password.match(/[^a-zA-Z0-9]/)) strength += 1;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = (strength: number) => {
    if (strength <= 2) return "bg-red-500";
    if (strength <= 3) return "bg-yellow-500";
    if (strength <= 4) return "bg-blue-500";
    return "bg-green-500";
  };

  const getPasswordStrengthLabel = (strength: number) => {
    if (strength <= 2) return "Weak";
    if (strength <= 3) return "Fair";
    if (strength <= 4) return "Good";
    return "Strong";
  };

  // Validation
  const validatePersonalInfo = () => {
    const errors: FormErrors = {};

    if (!userProfile.firstName.trim())
      errors.firstName = "First name is required";
    if (!userProfile.lastName.trim()) errors.lastName = "Last name is required";
    if (!userProfile.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userProfile.email))
      errors.email = "Invalid email format";
    if (!userProfile.phone.trim()) errors.phone = "Phone number is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePasswordChange = () => {
    const errors: FormErrors = {};

    if (!passwordData.currentPassword)
      errors.currentPassword = "Current password is required";
    if (!passwordData.newPassword)
      errors.newPassword = "New password is required";
    else if (passwordData.newPassword.length < 8)
      errors.newPassword = "Password must be at least 8 characters";
    if (passwordData.newPassword !== passwordData.confirmPassword)
      errors.confirmPassword = "Passwords do not match";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Save handlers
  const handleSavePersonalInfo = async () => {
    if (!validatePersonalInfo()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      success(
        "Profile Updated",
        "Your personal information has been updated successfully"
      );
      setIsEditing(false);
    } catch (err) {
      error("Update Failed", "Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveCommunicationPrefs = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      success(
        "Preferences Updated",
        "Your communication preferences have been saved"
      );
    } catch (err) {
      error("Update Failed", "Failed to save preferences. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (!validatePasswordChange()) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      success(
        "Password Changed",
        "Your password has been updated successfully"
      );
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPasswordStrength(0);
    } catch (err) {
      error(
        "Password Change Failed",
        "Failed to update password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccountDeletion = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed."
    );

    if (!confirmed) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      info(
        "Account Deletion",
        "Account deletion request submitted. You will receive a confirmation email."
      );
    } catch (err) {
      error(
        "Deletion Failed",
        "Failed to process account deletion. Please contact support."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Render functions for each tab
  const renderPersonalInfoTab = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src={userProfile.profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <button className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
              <Camera color="#ffffff" size={16} />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">
              {userProfile.firstName} {userProfile.lastName}
            </h2>
            <p className="text-gray-600">{userProfile.email}</p>
            <div className="flex items-center gap-4 mt-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getLoyaltyTierColor(
                  userProfile.loyaltyTier
                )}`}
              >
                {getLoyaltyIcon(userProfile.loyaltyTier)}
                {userProfile.loyaltyTier} Member
              </span>
              <span className="text-sm text-gray-500">
                Member since{" "}
                {new Date(userProfile.memberSince).toLocaleDateString()}
              </span>
            </div>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            className={`${
              isEditing
                ? "bg-gray-600 hover:bg-gray-700"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2`}
          >
            <Edit color="#ffffff" size={16} />
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>
      </div>

      {/* Personal Information Form */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Profile color="#3B82F6" size={20} />
          Personal Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <Input
              label="First Name"
              type="text"
              placeholder="Enter your first name"
              value={userProfile.firstName}
              onChange={(e) => handleProfileUpdate("firstName", e.target.value)}
              className="pl-10"
              error={formErrors.firstName}
              disabled={!isEditing || isLoading}
            />
            <Profile
              color="#6B7280"
              size={18}
              className="absolute left-3 top-9 text-gray-400"
            />
          </div>

          <div className="relative">
            <Input
              label="Last Name"
              type="text"
              placeholder="Enter your last name"
              value={userProfile.lastName}
              onChange={(e) => handleProfileUpdate("lastName", e.target.value)}
              className="pl-10"
              error={formErrors.lastName}
              disabled={!isEditing || isLoading}
            />
            <Profile
              color="#6B7280"
              size={18}
              className="absolute left-3 top-9 text-gray-400"
            />
          </div>

          <div className="relative">
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={userProfile.email}
              onChange={(e) => handleProfileUpdate("email", e.target.value)}
              className="pl-10"
              error={formErrors.email}
              disabled={!isEditing || isLoading}
            />
            <Sms
              color="#6B7280"
              size={18}
              className="absolute left-3 top-9 text-gray-400"
            />
          </div>

          <div className="relative">
            <Input
              label="Phone Number"
              type="tel"
              placeholder="Enter your phone number"
              value={userProfile.phone}
              onChange={(e) => handleProfileUpdate("phone", e.target.value)}
              className="pl-10"
              error={formErrors.phone}
              disabled={!isEditing || isLoading}
            />
            <Call
              color="#6B7280"
              size={18}
              className="absolute left-3 top-9 text-gray-400"
            />
          </div>

          <div className="relative">
            <Input
              label="Date of Birth"
              type="date"
              value={userProfile.dateOfBirth}
              onChange={(e) =>
                handleProfileUpdate("dateOfBirth", e.target.value)
              }
              className="pl-10"
              disabled={!isEditing || isLoading}
            />
            <Calendar
              color="#6B7280"
              size={18}
              className="absolute left-3 top-9 text-gray-400"
            />
          </div>
        </div>

        {/* Address Section */}
        <div className="mt-8">
          <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center gap-2">
            <Location color="#3B82F6" size={18} />
            Address Information
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Input
                label="Street Address"
                type="text"
                placeholder="Enter your street address"
                value={userProfile.address.street}
                onChange={(e) =>
                  handleProfileUpdate("address.street", e.target.value)
                }
                disabled={!isEditing || isLoading}
              />
            </div>

            <Input
              label="City"
              type="text"
              placeholder="Enter your city"
              value={userProfile.address.city}
              onChange={(e) =>
                handleProfileUpdate("address.city", e.target.value)
              }
              disabled={!isEditing || isLoading}
            />

            <Input
              label="State/Province"
              type="text"
              placeholder="Enter your state or province"
              value={userProfile.address.state}
              onChange={(e) =>
                handleProfileUpdate("address.state", e.target.value)
              }
              disabled={!isEditing || isLoading}
            />

            <Input
              label="Country"
              type="text"
              placeholder="Enter your country"
              value={userProfile.address.country}
              onChange={(e) =>
                handleProfileUpdate("address.country", e.target.value)
              }
              disabled={!isEditing || isLoading}
            />

            <Input
              label="ZIP/Postal Code"
              type="text"
              placeholder="Enter your ZIP or postal code"
              value={userProfile.address.zipCode}
              onChange={(e) =>
                handleProfileUpdate("address.zipCode", e.target.value)
              }
              disabled={!isEditing || isLoading}
            />
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end gap-3 mt-6">
            <Button
              onClick={() => setIsEditing(false)}
              className="text-gray-600 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 px-6 py-2 rounded-lg transition-colors"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSavePersonalInfo}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              {isLoading ? (
                <SpinLoader />
              ) : (
                <TickCircle color="#ffffff" size={16} />
              )}
              Save Changes
            </Button>
          </div>
        )}
      </div>

      {/* Travel Preferences */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Setting2 color="#3B82F6" size={20} />
          Travel Preferences
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Currency
            </label>
            <select
              value={userProfile.preferences.currency}
              onChange={(e) =>
                handleProfileUpdate("preferences.currency", e.target.value)
              }
              disabled={!isEditing || isLoading}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="JPY">JPY - Japanese Yen</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select
              value={userProfile.preferences.language}
              onChange={(e) =>
                handleProfileUpdate("preferences.language", e.target.value)
              }
              disabled={!isEditing || isLoading}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            >
              <option value="English">English</option>
              <option value="Spanish">Español</option>
              <option value="French">Français</option>
              <option value="German">Deutsch</option>
              <option value="Japanese">日本語</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Room Type
            </label>
            <select
              value={userProfile.preferences.roomType}
              onChange={(e) =>
                handleProfileUpdate("preferences.roomType", e.target.value)
              }
              disabled={!isEditing || isLoading}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            >
              <option value="Single Bed">Single Bed</option>
              <option value="Twin Beds">Twin Beds</option>
              <option value="Queen Bed">Queen Bed</option>
              <option value="King Bed">King Bed</option>
              <option value="Suite">Suite</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Smoking Preference
            </label>
            <select
              value={userProfile.preferences.smokingPreference}
              onChange={(e) =>
                handleProfileUpdate(
                  "preferences.smokingPreference",
                  e.target.value
                )
              }
              disabled={!isEditing || isLoading}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            >
              <option value="non-smoking">Non-Smoking</option>
              <option value="smoking">Smoking</option>
              <option value="no-preference">No Preference</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Requests
            </label>
            <textarea
              value={userProfile.preferences.specialRequests}
              onChange={(e) =>
                handleProfileUpdate(
                  "preferences.specialRequests",
                  e.target.value
                )
              }
              disabled={!isEditing || isLoading}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              placeholder="Any special requests or preferences for your stays..."
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-6">
      {/* Email Notifications */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Sms color="#3B82F6" size={20} />
          Email Notifications
        </h3>

        <div className="space-y-4">
          {Object.entries(communicationPrefs.emailNotifications).map(
            ([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 capitalize">
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </p>
                  <p className="text-sm text-gray-600">
                    {key === "bookingConfirmations" &&
                      "Receive emails when bookings are confirmed or updated"}
                    {key === "promotionalOffers" &&
                      "Get notified about special deals and promotions"}
                    {key === "travelReminders" &&
                      "Reminders about upcoming trips and check-ins"}
                    {key === "newsletter" &&
                      "Weekly newsletter with travel tips and destinations"}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) =>
                      handleCommunicationPrefUpdate(
                        "emailNotifications",
                        key,
                        e.target.checked
                      )
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            )
          )}
        </div>

        <div className="mt-6 pt-6 border-t">
          <Button
            onClick={handleSaveCommunicationPrefs}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            {isLoading ? (
              <SpinLoader />
            ) : (
              <TickCircle color="#ffffff" size={16} />
            )}
            Save Preferences
          </Button>
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      {/* Password Change */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Lock color="#3B82F6" size={20} />
          Change Password
        </h3>

        <div className="space-y-6">
          <div className="relative">
            <Input
              label="Current Password"
              type={showPasswords.current ? "text" : "password"}
              placeholder="Enter your current password"
              value={passwordData.currentPassword}
              onChange={(e) =>
                handlePasswordChange("currentPassword", e.target.value)
              }
              className="pl-10 pr-12"
              error={formErrors.currentPassword}
              disabled={isLoading}
            />
            <Lock
              color="#6B7280"
              size={18}
              className="absolute left-3 top-9 text-gray-400"
            />
            <button
              type="button"
              onClick={() =>
                setShowPasswords((prev) => ({
                  ...prev,
                  current: !prev.current,
                }))
              }
              className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPasswords.current ? (
                <EyeSlash color="#6B7280" size={18} />
              ) : (
                <Eye color="#6B7280" size={18} />
              )}
            </button>
          </div>

          <div className="relative">
            <Input
              label="New Password"
              type={showPasswords.new ? "text" : "password"}
              placeholder="Enter your new password"
              value={passwordData.newPassword}
              onChange={(e) =>
                handlePasswordChange("newPassword", e.target.value)
              }
              className="pl-10 pr-12"
              error={formErrors.newPassword}
              disabled={isLoading}
            />
            <Lock
              color="#6B7280"
              size={18}
              className="absolute left-3 top-9 text-gray-400"
            />
            <button
              type="button"
              onClick={() =>
                setShowPasswords((prev) => ({ ...prev, new: !prev.new }))
              }
              className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPasswords.new ? (
                <EyeSlash color="#6B7280" size={18} />
              ) : (
                <Eye color="#6B7280" size={18} />
              )}
            </button>
          </div>

          {/* Password Strength Indicator */}
          {passwordData.newPassword && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Password Strength:
                </span>
                <span
                  className={`text-sm font-medium ${
                    passwordStrength <= 2
                      ? "text-red-600"
                      : passwordStrength <= 3
                      ? "text-yellow-600"
                      : passwordStrength <= 4
                      ? "text-blue-600"
                      : "text-green-600"
                  }`}
                >
                  {getPasswordStrengthLabel(passwordStrength)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor(
                    passwordStrength
                  )}`}
                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="relative">
            <Input
              label="Confirm New Password"
              type={showPasswords.confirm ? "text" : "password"}
              placeholder="Confirm your new password"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                handlePasswordChange("confirmPassword", e.target.value)
              }
              className="pl-10 pr-12"
              error={formErrors.confirmPassword}
              disabled={isLoading}
            />
            <Lock
              color="#6B7280"
              size={18}
              className="absolute left-3 top-9 text-gray-400"
            />
            <button
              type="button"
              onClick={() =>
                setShowPasswords((prev) => ({
                  ...prev,
                  confirm: !prev.confirm,
                }))
              }
              className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPasswords.confirm ? (
                <EyeSlash color="#6B7280" size={18} />
              ) : (
                <Eye color="#6B7280" size={18} />
              )}
            </button>
          </div>

          <Button
            onClick={handlePasswordUpdate}
            disabled={
              isLoading ||
              !passwordData.currentPassword ||
              !passwordData.newPassword ||
              !passwordData.confirmPassword
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? <SpinLoader /> : <Shield color="#ffffff" size={16} />}
            Update Password
          </Button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <SecurityUser color="#3B82F6" size={20} />
          Two-Factor Authentication
        </h3>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium text-gray-900">SMS Authentication</p>
            <p className="text-sm text-gray-600">
              Add an extra layer of security to your account
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-red-600 font-medium">Disabled</span>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              Enable
            </Button>
          </div>
        </div>
      </div>

      {/* Login Activity */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Global color="#3B82F6" size={20} />
          Recent Login Activity
        </h3>

        <div className="space-y-3">
          {[
            {
              device: "Chrome on MacBook Pro",
              location: "New York, NY",
              time: "2 hours ago",
              current: true,
            },
            {
              device: "Safari on iPhone",
              location: "New York, NY",
              time: "1 day ago",
              current: false,
            },
            {
              device: "Chrome on Windows",
              location: "Boston, MA",
              time: "3 days ago",
              current: false,
            },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Global color="#3B82F6" size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{activity.device}</p>
                  <p className="text-sm text-gray-600">
                    {activity.location} • {activity.time}
                  </p>
                </div>
              </div>
              {activity.current && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                  Current Session
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="space-y-6">
      {/* Privacy Settings */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Shield color="#3B82F6" size={20} />
          Privacy & Data
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Profile Visibility</p>
              <p className="text-sm text-gray-600">
                Make your profile visible to other travelers
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Location Tracking</p>
              <p className="text-sm text-gray-600">
                Allow location-based recommendations
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Analytics & Cookies</p>
              <p className="text-sm text-gray-600">
                Help us improve by sharing usage data
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Data Export */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <InfoCircle color="#3B82F6" size={20} />
          Data Export & Management
        </h3>

        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">
              Download Your Data
            </h4>
            <p className="text-sm text-blue-700 mb-3">
              Get a copy of all your personal data, including bookings,
              preferences, and activity history.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              Request Data Export
            </Button>
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-medium text-yellow-900 mb-2">Data Retention</h4>
            <p className="text-sm text-yellow-700">
              We keep your data for 7 years after account closure as required by
              law. You can request early deletion by contacting support.
            </p>
          </div>
        </div>
      </div>

      {/* Account Deletion */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-red-600 mb-4 flex items-center gap-2">
          <Trash color="#DC2626" size={20} />
          Delete Account
        </h3>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <InfoCircle
              color="#DC2626"
              size={20}
              className="mt-0.5 flex-shrink-0"
            />
            <div className="flex-1">
              <h4 className="font-medium text-red-900 mb-2">
                Permanently Delete Account
              </h4>
              <p className="text-sm text-red-700 mb-4">
                This action cannot be undone. All your data, including bookings
                history, preferences, and reviews will be permanently deleted.
              </p>
              <Button
                onClick={handleAccountDeletion}
                disabled={isLoading}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                {isLoading ? (
                  <SpinLoader />
                ) : (
                  <Trash color="#ffffff" size={16} />
                )}
                Delete My Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleGoToDashboard}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft color="#6B7280" size={24} />
              </button>
              <div className="flex items-center gap-3">
                <Logo size={40} />
                <span
                  className="text-xl font-bold text-gray-900 cursor-pointer"
                  onClick={handleGoHome}
                >
                  StaySpot
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 relative">
                <Notification color="#6B7280" size={24} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="flex items-center gap-3">
                <img
                  src={userProfile.profileImage}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">
                    {userProfile.firstName} {userProfile.lastName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {userProfile.loyaltyTier} Member
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Profile Settings
          </h1>
          <p className="text-gray-600">
            Manage your account information and preferences
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                {
                  id: "personal",
                  label: "Personal Info",
                  icon: (
                    <Profile
                      color={activeTab === "personal" ? "#3B82F6" : "#6B7280"}
                      size={20}
                    />
                  ),
                },
                {
                  id: "preferences",
                  label: "Communication",
                  icon: (
                    <Notification
                      color={
                        activeTab === "preferences" ? "#3B82F6" : "#6B7280"
                      }
                      size={20}
                    />
                  ),
                },
                {
                  id: "security",
                  label: "Security",
                  icon: (
                    <Lock
                      color={activeTab === "security" ? "#3B82F6" : "#6B7280"}
                      size={20}
                    />
                  ),
                },
                {
                  id: "privacy",
                  label: "Privacy",
                  icon: (
                    <Shield
                      color={activeTab === "privacy" ? "#3B82F6" : "#6B7280"}
                      size={20}
                    />
                  ),
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "personal" && renderPersonalInfoTab()}
          {activeTab === "preferences" && renderPreferencesTab()}
          {activeTab === "security" && renderSecurityTab()}
          {activeTab === "privacy" && renderPrivacyTab()}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
