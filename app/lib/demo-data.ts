export type Sentiment = "Positive" | "Neutral" | "Negative";

export type DemoComment = {
  id: string;
  datasetId: string;
  customer: string;
  initials: string;
  comment: string;
  sentiment: Sentiment;
  confidence: number;
  language: string;
  spam: boolean;
  spamReason?: string;
  product: string;
  source: string;
  date: string;
  region: string;
  topics: string[];
};

export type DemoDataset = {
  id: string;
  name: string;
  source: string;
  created: string;
  commentsCount: number;
  status: "Completed" | "Processing" | "Failed";
  products: string[];
};

export const initialDatasets: DemoDataset[] = [
  { id: "spring-reviews", name: "Spring product reviews", source: "Product reviews", created: "May 20, 2025", commentsCount: 2458, status: "Completed", products: ["Everyday Backpack", "Travel Bottle", "Weekender Tote"] },
  { id: "support-feedback", name: "Support feedback", source: "Customer support", created: "May 18, 2025", commentsCount: 1206, status: "Completed", products: ["Customer Support"] },
  { id: "launch-comments", name: "Social launch comments", source: "Social media", created: "May 12, 2025", commentsCount: 584, status: "Completed", products: ["Spring Collection"] },
];

export const initialComments: DemoComment[] = [
  { id: "c-01", datasetId: "spring-reviews", customer: "Sarah Johnson", initials: "SJ", comment: "The new backpack is so thoughtfully designed. The pockets make everything easy to find.", sentiment: "Positive", confidence: 96, language: "English", spam: false, product: "Everyday Backpack", source: "Product review", date: "2025-05-20", region: "United States", topics: ["Design", "Ease of use"] },
  { id: "c-02", datasetId: "spring-reviews", customer: "Michael Brown", initials: "MB", comment: "My order arrived four days later than the estimate. The product is lovely, but shipping was frustrating.", sentiment: "Negative", confidence: 91, language: "English", spam: false, product: "Weekender Tote", source: "Product review", date: "2025-05-19", region: "United Kingdom", topics: ["Shipping"] },
  { id: "c-03", datasetId: "support-feedback", customer: "Aisha Khan", initials: "AK", comment: "Support replied quickly and helped me change the delivery address. Really appreciated it.", sentiment: "Positive", confidence: 98, language: "English", spam: false, product: "Customer Support", source: "Support ticket", date: "2025-05-19", region: "India", topics: ["Customer support"] },
  { id: "c-04", datasetId: "spring-reviews", customer: "David Wilson", initials: "DW", comment: "It keeps water cold all day, although the lid is a little hard to clean.", sentiment: "Neutral", confidence: 63, language: "English", spam: false, product: "Travel Bottle", source: "Product review", date: "2025-05-18", region: "Canada", topics: ["Product quality", "Cleaning"] },
  { id: "c-05", datasetId: "launch-comments", customer: "Olivia Chen", initials: "OC", comment: "The colors in this collection are beautiful. Please make the sage green one in a larger size!", sentiment: "Positive", confidence: 94, language: "English", spam: false, product: "Spring Collection", source: "Social media", date: "2025-05-18", region: "United States", topics: ["Color", "Feature request"] },
  { id: "c-06", datasetId: "spring-reviews", customer: "Liam Garcia", initials: "LG", comment: "The zipper caught after the second week. I expected better durability at this price.", sentiment: "Negative", confidence: 89, language: "English", spam: false, product: "Everyday Backpack", source: "Product review", date: "2025-05-17", region: "Spain", topics: ["Durability"] },
  { id: "c-07", datasetId: "support-feedback", customer: "Emma Davis", initials: "ED", comment: "I had to explain the same issue to three different people before it was resolved.", sentiment: "Negative", confidence: 95, language: "English", spam: false, product: "Customer Support", source: "Support ticket", date: "2025-05-17", region: "United States", topics: ["Customer support", "Handoffs"] },
  { id: "c-08", datasetId: "spring-reviews", customer: "Noah Patel", initials: "NP", comment: "Looks just like the photos. The material feels sturdy and the size is perfect for commuting.", sentiment: "Positive", confidence: 97, language: "English", spam: false, product: "Everyday Backpack", source: "Product review", date: "2025-05-16", region: "India", topics: ["Quality", "Size"] },
  { id: "c-09", datasetId: "launch-comments", customer: "Mia Thompson", initials: "MT", comment: "Where can I find the size guide? I love the look but need measurements before ordering.", sentiment: "Neutral", confidence: 68, language: "English", spam: false, product: "Spring Collection", source: "Social media", date: "2025-05-16", region: "Australia", topics: ["Sizing", "Information"] },
  { id: "c-10", datasetId: "spring-reviews", customer: "Lucas Martin", initials: "LM", comment: "BUY NOW!!! Visit best-deals.example for an exclusive offer!!!", sentiment: "Positive", confidence: 57, language: "English", spam: true, spamReason: "Promotional link and repetitive sales language", product: "Travel Bottle", source: "Product review", date: "2025-05-15", region: "Unknown", topics: ["Promotional"] },
  { id: "c-11", datasetId: "support-feedback", customer: "Priya Shah", initials: "PS", comment: "The agent was kind, but I still don't know when the replacement will ship.", sentiment: "Negative", confidence: 79, language: "English", spam: false, product: "Customer Support", source: "Support ticket", date: "2025-05-15", region: "India", topics: ["Resolution", "Shipping"] },
  { id: "c-12", datasetId: "spring-reviews", customer: "Ethan Walker", initials: "EW", comment: "Good quality for the price. I use it every day and would recommend it to friends.", sentiment: "Positive", confidence: 92, language: "English", spam: false, product: "Weekender Tote", source: "Product review", date: "2025-05-14", region: "United Kingdom", topics: ["Value", "Quality"] },
  { id: "c-13", datasetId: "spring-reviews", customer: "Sofia Rossi", initials: "SR", comment: "La bottiglia è bella e mantiene l'acqua fresca. Il tappo però perde un po'.", sentiment: "Negative", confidence: 74, language: "Italian", spam: false, product: "Travel Bottle", source: "Product review", date: "2025-05-13", region: "Italy", topics: ["Leak", "Quality"] },
  { id: "c-14", datasetId: "launch-comments", customer: "James Taylor", initials: "JT", comment: "This is the third time I have seen this exact review. Totally amazing product totally amazing product.", sentiment: "Positive", confidence: 52, language: "English", spam: true, spamReason: "Repeated promotional wording", product: "Spring Collection", source: "Social media", date: "2025-05-12", region: "Unknown", topics: ["Repetitive"] },
  { id: "c-15", datasetId: "support-feedback", customer: "Grace Lee", initials: "GL", comment: "My question was answered in minutes. The help center article was useful too.", sentiment: "Positive", confidence: 97, language: "English", spam: false, product: "Customer Support", source: "Support ticket", date: "2025-05-12", region: "Singapore", topics: ["Customer support", "Help center"] },
  { id: "c-16", datasetId: "spring-reviews", customer: "Arjun Mehta", initials: "AM", comment: "The bag is comfortable, but I wish the laptop sleeve had a little more padding.", sentiment: "Neutral", confidence: 61, language: "English", spam: false, product: "Everyday Backpack", source: "Product review", date: "2025-05-11", region: "India", topics: ["Comfort", "Feature request"] },
  { id: "c-17", datasetId: "launch-comments", customer: "Chloe Martin", initials: "CM", comment: "Très belle collection, les matières ont l'air agréables. J'aimerais voir plus de couleurs.", sentiment: "Positive", confidence: 83, language: "French", spam: false, product: "Spring Collection", source: "Social media", date: "2025-05-10", region: "France", topics: ["Collection", "Color"] },
  { id: "c-18", datasetId: "spring-reviews", customer: "Benjamin Clark", initials: "BC", comment: "The tote is spacious but the inner pocket is too small for my phone.", sentiment: "Neutral", confidence: 77, language: "English", spam: false, product: "Weekender Tote", source: "Product review", date: "2025-05-09", region: "United States", topics: ["Size", "Design"] },
];

export const demoInsights = {
  summary: "Customers are responding well to the product design and everyday usability. The clearest recurring concern is delivery timing, followed by durability questions about zippers and bottle lids. Support interactions are often described positively, though handoffs and replacement timelines create friction.",
  positives: ["Thoughtful organization and easy-to-use designs", "Sturdy materials and good value", "Friendly, responsive support agents"],
  concerns: ["Delivery estimates are missed for some orders", "Some customers report zipper and lid durability issues", "Support handoffs can require customers to repeat context"],
  opportunities: ["Review shipping estimates for international orders", "Inspect zipper and lid quality feedback by product batch", "Make support history easier to carry between agents"],
};
