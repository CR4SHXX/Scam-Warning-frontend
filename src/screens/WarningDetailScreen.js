// src/screens/WarningDetailScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

const WarningDetailScreen = ({ route, navigation }) => {
  const { warningId } = route.params;
  
  // State for comment form
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [username, setUsername] = useState('');

  // Fake data - find warning by ID
  const allWarnings = [
    {
      id: 1,
      title: "Phone Call Scam Alert",
      description: "Beware of calls claiming to be from tax authorities demanding immediate payment. These scammers use pressure tactics and threats of legal action to frighten victims into sending money quickly.",
      category: "Phone",
      warningSigns: [
        "Caller demands immediate payment",
        "Threats of arrest or legal action",
        "Request for gift cards or wire transfers",
        "Caller ID may be spoofed to look official"
      ],
      datePosted: "2024-01-15"
    },
    {
      id: 2,
      title: "Fake Investment Opportunity",
      description: "Fraudulent investment schemes promising guaranteed high returns with little to no risk. Scammers often create fake websites and documentation to appear legitimate.",
      category: "Investment",
      warningSigns: [
        "Promises of unusually high returns",
        "Pressure to invest immediately",
        "Unregistered investments",
        "Complex strategies that are hard to understand"
      ],
      datePosted: "2024-01-14"
    },
    {
      id: 3,
      title: "Email Phishing Campaign",
      description: "Fake emails claiming to be from well-known companies asking you to verify your account information or reset your password. Links lead to fake websites designed to steal your credentials.",
      category: "Email",
      warningSigns: [
        "Generic greetings instead of your name",
        "Spelling and grammar errors",
        "Suspicious links or attachments",
        "Urgent requests for personal information"
      ],
      datePosted: "2024-01-13"
    },
    {
      id: 4,
      title: "Online Shopping Fraud",
      description: "Fake e-commerce websites selling products at incredibly low prices. After payment, goods never arrive or are counterfeit.",
      category: "Online",
      warningSigns: [
        "Prices too good to be true",
        "No contact information or customer reviews",
        "Poor website design with broken links",
        "Only accepts wire transfers or cryptocurrency"
      ],
      datePosted: "2024-01-12"
    },
    {
      id: 5,
      title: "Romance Scam Warning",
      description: "Scammers create fake profiles on dating sites and social media, build romantic relationships, then ask for money for emergencies or travel expenses.",
      category: "Social Media",
      warningSigns: [
        "Professes love very quickly",
        "Never wants to meet in person or video chat",
        "Always has an emergency requiring money",
        "Asks you to communicate off the platform"
      ],
      datePosted: "2024-01-11"
    },
    {
      id: 6,
      title: "Tech Support Scam",
      description: "Fake tech support calls or pop-ups claiming your computer has a virus. They request remote access to your device and charge for unnecessary services.",
      category: "Phone",
      warningSigns: [
        "Unsolicited calls about computer problems",
        "Pop-ups that won't close warning of viruses",
        "Request for remote access to your device",
        "Demand payment for unnecessary services"
      ],
      datePosted: "2024-01-10"
    },
    {
      id: 7,
      title: "Lottery/Prize Scam",
      description: "Notifications claiming you've won a lottery or prize you never entered. Scammers ask for payment of taxes or fees before releasing the prize.",
      category: "Email",
      warningSigns: [
        "Winning a contest you never entered",
        "Request to pay fees or taxes upfront",
        "Pressure to act quickly",
        "Poor grammar in official communications"
      ],
      datePosted: "2024-01-09"
    },
    {
      id: 8,
      title: "Job Offer Scam",
      description: "Fake job postings offering high salaries for minimal work. Scammers may ask for personal information, upfront fees, or use you for money laundering.",
      category: "Online",
      warningSigns: [
        "Job offer without an interview",
        "Salary too high for the position",
        "Request for personal banking information",
        "Asked to pay for training or equipment"
      ],
      datePosted: "2024-01-08"
    },
    {
      id: 9,
      title: "Rental Property Scam",
      description: "Fraudulent rental listings with photos stolen from legitimate sites. Scammers collect deposits and disappear, or the property doesn't exist.",
      category: "Online",
      warningSigns: [
        "Owner refuses to meet in person",
        "Pressure to send deposit immediately",
        "Price significantly below market rate",
        "Owner claims to be out of the country"
      ],
      datePosted: "2024-01-07"
    },
    {
      id: 10,
      title: "Charity Scam Alert",
      description: "Fake charities that exploit generosity, especially after natural disasters. They collect donations but never help the intended beneficiaries.",
      category: "Phone",
      warningSigns: [
        "Pressure to donate immediately",
        "Vague description of how funds will be used",
        "Unwilling to provide documentation",
        "Thanks you for previous donation you never made"
      ],
      datePosted: "2024-01-06"
    },
    {
      id: 11,
      title: "Credit Card Skimming",
      description: "Devices installed on ATMs or payment terminals to steal card information. Thieves use this data to make unauthorized purchases or create counterfeit cards.",
      category: "Other",
      warningSigns: [
        "Card reader looks bulky or misaligned",
        "Unusual cameras near PIN pad",
        "Loose or damaged parts on ATM",
        "Keyboard feels different or doesn't sit flush"
      ],
      datePosted: "2024-01-05"
    },
    {
      id: 12,
      title: "Grandparent Scam",
      description: "Scammers call elderly people pretending to be a grandchild in trouble, requesting urgent money for bail, hospital bills, or other emergencies.",
      category: "Phone",
      warningSigns: [
        "Caller claims to be relative in trouble",
        "Asks you to keep the call secret",
        "Demands immediate wire transfer",
        "Voice doesn't quite sound like grandchild"
      ],
      datePosted: "2024-01-04"
    },
    {
      id: 13,
      title: "Social Media Impersonation",
      description: "Scammers create fake accounts impersonating friends or celebrities to request money or personal information.",
      category: "Social Media",
      warningSigns: [
        "New account from someone you're already friends with",
        "Poor quality profile photo",
        "Immediate requests for money or info",
        "Generic messages not matching their style"
      ],
      datePosted: "2024-01-03"
    },
    {
      id: 14,
      title: "IRS/Tax Authority Scam",
      description: "Fake calls or emails from tax authorities claiming you owe money and threatening arrest or legal action if you don't pay immediately.",
      category: "Email",
      warningSigns: [
        "Threatening immediate arrest",
        "Demanding specific payment methods",
        "No opportunity to question or appeal",
        "Call from unexpected number"
      ],
      datePosted: "2024-01-02"
    },
    {
      id: 15,
      title: "Cryptocurrency Scam",
      description: "Fraudulent cryptocurrency investment platforms or fake celebrity endorsements promising guaranteed profits. Once you invest, your money disappears.",
      category: "Investment",
      warningSigns: [
        "Guaranteed returns with no risk",
        "Celebrity endorsements that seem suspicious",
        "Pressure to recruit others",
        "Complex explanation of how profits are generated"
      ],
      datePosted: "2024-01-01"
    }
  ];

  const warning = allWarnings.find(w => w.id === warningId);

  // Fake comments data
  const comments = [
    {
      id: 1,
      username: "Sarah M.",
      comment: "Thank you for posting this! I almost fell for a similar scam last week. Stay vigilant everyone!",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      username: "John D.",
      comment: "My elderly mother received this exact call. Fortunately, I was there to stop her from sending money. Please share this with older family members.",
      timestamp: "5 hours ago"
    },
    {
      id: 3,
      username: "Lisa K.",
      comment: "Great information. I've reported similar activity to local authorities. Everyone should be aware of these tactics.",
      timestamp: "1 day ago"
    },
    {
      id: 4,
      username: "Mike R.",
      comment: "This happened to my neighbor last month. They lost over $5,000. Thank you for spreading awareness!",
      timestamp: "2 days ago"
    }
  ];

  // Handle comment submission
  const handleSubmitComment = () => {
    // Validation
    if (!username.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }
    if (!commentText.trim()) {
      Alert.alert('Error', 'Please enter a comment');
      return;
    }

    // Prepare comment data for API
    const commentData = {
      warningId: warningId,
      username: username.trim(),
      comment: commentText.trim(),
      timestamp: new Date().toISOString(),
    };

    console.log('=== NEW COMMENT SUBMISSION ===');
    console.log('Warning ID:', commentData.warningId);
    console.log('Username:', commentData.username);
    console.log('Comment:', commentData.comment);
    console.log('Timestamp:', commentData.timestamp);
    console.log('==============================');

    // Show success message
    Alert.alert(
      'Success!',
      'Your comment has been submitted (API connection in Phase 3)',
      [
        {
          text: 'OK',
          onPress: () => {
            // Clear form and hide it
            setCommentText('');
            setUsername('');
            setShowCommentForm(false);
          }
        }
      ]
    );
  };

  // Handle cancel
  const handleCancelComment = () => {
    setCommentText('');
    setUsername('');
    setShowCommentForm(false);
  };

  if (!warning) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Warning not found</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.container}>
        {/* Category Badge */}
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{warning.category}</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>{warning.title}</Text>

        {/* Date */}
        <Text style={styles.date}>Posted on {warning.datePosted}</Text>

        {/* Description Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{warning.description}</Text>
        </View>

        {/* Warning Signs Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Warning Signs</Text>
          {warning.warningSigns.map((sign, index) => (
            <View key={index} style={styles.warningSignItem}>
              <Text style={styles.bullet}>⚠️</Text>
              <Text style={styles.warningSignText}>{sign}</Text>
            </View>
          ))}
        </View>

        {/* Report Button */}
        <TouchableOpacity 
          style={styles.reportButton}
          onPress={() => navigation.navigate('AddWarning')}
        >
          <Text style={styles.reportButtonText}>🚨 Report Similar Scam</Text>
        </TouchableOpacity>

        {/* Comments Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Community Comments ({comments.length})</Text>
          {comments.map((comment) => (
            <View key={comment.id} style={styles.commentItem}>
              <View style={styles.commentHeader}>
                <Text style={styles.commentUsername}>{comment.username}</Text>
                <Text style={styles.commentTimestamp}>{comment.timestamp}</Text>
              </View>
              <Text style={styles.commentText}>{comment.comment}</Text>
            </View>
          ))}
        </View>

        {/* Add Comment Button - Toggle Form */}
        {!showCommentForm ? (
          <TouchableOpacity 
            style={styles.addCommentButton}
            onPress={() => setShowCommentForm(true)}
          >
            <Text style={styles.addCommentButtonText}>💬 Add Your Comment</Text>
          </TouchableOpacity>
        ) : (
          /* Comment Form */
          <View style={styles.commentFormContainer}>
            <Text style={styles.formTitle}>Add Your Comment</Text>
            
            {/* Username Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Your Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={username}
                onChangeText={setUsername}
                maxLength={50}
              />
            </View>

            {/* Comment Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Your Comment *</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Share your experience or thoughts about this scam..."
                value={commentText}
                onChangeText={setCommentText}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                maxLength={500}
              />
              <Text style={styles.charCount}>{commentText.length}/500</Text>
            </View>

            {/* Form Buttons */}
            <View style={styles.formButtonsContainer}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={handleCancelComment}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.submitButton}
                onPress={handleSubmitComment}
              >
                <Text style={styles.submitButtonText}>Post Comment</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Bottom Spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 12,
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  warningSignItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bullet: {
    fontSize: 16,
    marginRight: 8,
    marginTop: 2,
  },
  warningSignText: {
    flex: 1,
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
  reportButton: {
    backgroundColor: '#FF3B30',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reportButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  commentUsername: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  commentTimestamp: {
    fontSize: 12,
    color: '#999',
  },
  commentText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  addCommentButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addCommentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // COMMENT FORM STYLES
  commentFormContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    minHeight: 100,
    paddingTop: 12,
  },
  charCount: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    marginTop: 4,
  },
  formButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#007AFF',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default WarningDetailScreen;