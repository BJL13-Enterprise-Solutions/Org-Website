import { db } from "./db";
import { localServices, documents, type InsertLocalService, type InsertDocument } from "@shared/schema";

const seedData: InsertLocalService[] = [
  {
    name: "KC Mobile Notary Services",
    category: "notary",
    address: "Kansas City, MO",
    phone: "(816) 555-0123",
    website: "https://kcmobilenotary.com",
    description: "Professional mobile notary services throughout Kansas City metro area. Available 7 days a week.",
    isActive: true,
  },
  {
    name: "Legal Aid of Western Missouri",
    category: "legal",
    address: "1000 Walnut St, Kansas City, MO 64106",
    phone: "(816) 474-6750",
    website: "https://lawmo.org",
    description: "Free legal assistance for low-income residents in civil matters including housing, family law, and public benefits.",
    isActive: true,
  },
  {
    name: "Metropolitan Organization to Counter Sexual Assault (MOCSA)",
    category: "crisis",
    address: "Kansas City, MO",
    phone: "(816) 531-0233",
    website: "https://mocsa.org",
    description: "24/7 crisis hotline and support services for survivors of sexual violence.",
    isActive: true,
  },
  {
    name: "Heart of America United Way 211",
    category: "resources",
    address: "Kansas City, MO",
    phone: "211",
    website: "https://hoauw.org/211",
    description: "Comprehensive resource connection service. Call 211 for help finding local assistance programs.",
    isActive: true,
  },
];

const seedDocuments: InsertDocument[] = [
  {
    title: "Missouri Tenant Rights Guide",
    content: `Know Your Rights as a Tenant in Missouri

**Notice Requirements:**
- 30-day notice required for month-to-month tenancies
- Landlords must provide proper written notice before eviction
- Court papers must be served properly - you have the right to respond

**Habitability Rights:**
- Landlords must maintain premises in livable condition
- You have the right to request repairs for essential services
- You cannot be evicted in retaliation for requesting repairs

**Security Deposits:**
- Must be returned within 30 days of move-out
- Landlord must provide itemized list of any deductions
- Normal wear and tear cannot be deducted

**Getting Help:**
- Legal Aid of Western Missouri: (816) 474-6750
- Missouri Attorney General's Office: Consumer Protection
- Local tenant rights organizations`,
    category: "housing",
    source: "Missouri Legal Aid",
    jurisdiction: "kansas_city",
    isActive: true,
  },
  {
    title: "SNAP Benefits Application Guide",
    content: `How to Apply for SNAP (Food Assistance) in Missouri

**Who Qualifies:**
- Income limits based on household size
- Students, elderly, and disabled may have special rules
- Resources (bank accounts, vehicles) are considered

**Required Documents:**
- Photo ID for all household members
- Social Security cards
- Proof of income (pay stubs, benefit letters)
- Proof of expenses (rent, utilities, medical costs)
- Bank statements

**Application Process:**
1. Apply online at mydss.mo.gov
2. Complete phone interview within 7 days
3. Submit required documents
4. Receive decision within 30 days

**Emergency Benefits:**
- Can receive benefits within 7 days if eligible
- Must have very low income and resources

**Renewing Benefits:**
- Must recertify every 6-12 months
- Will receive renewal packet by mail`,
    category: "benefits",
    source: "Missouri Department of Social Services",
    jurisdiction: "kansas_city",
    isActive: true,
  },
  {
    title: "Understanding Court Papers - Eviction Notice",
    content: `What to Do When You Receive Eviction Court Papers

**DO NOT IGNORE - You Have Rights and Deadlines**

**Types of Court Papers:**
- Summons: Tells you about the court case
- Petition: Explains why landlord wants to evict you
- Notice to Quit: Demands you move out by a certain date

**Important Deadlines:**
- Usually 7-10 days to respond to court
- Missing deadline means automatic judgment against you
- Mark court date on calendar immediately

**Your Options:**
1. **Pay what you owe** (if for nonpayment)
2. **Fix the problem** (if for lease violation)
3. **Fight the eviction** (if you disagree with claims)
4. **Negotiate with landlord** for more time

**Preparing for Court:**
- Gather all evidence (lease, receipts, photos, emails)
- Prepare your side of the story
- Consider getting legal help
- Dress appropriately for court

**Free Legal Help:**
- Legal Aid of Western Missouri: (816) 474-6750
- Volunteer lawyers may be available at courthouse`,
    category: "legal",
    source: "Kansas City Legal Aid",
    jurisdiction: "kansas_city",
    isActive: true,
  },
];

export async function seedDatabase() {
  try {
    // Check if data already exists
    const existingServices = await db.select().from(localServices);
    const existingDocuments = await db.select().from(documents);
    
    if (existingServices.length === 0) {
      console.log("Seeding database with local services...");
      await db.insert(localServices).values(seedData);
      console.log("Local services seeded successfully!");
    } else {
      console.log("Database already has local services data.");
    }

    if (existingDocuments.length === 0) {
      console.log("Seeding database with knowledge documents...");
      await db.insert(documents).values(seedDocuments);
      console.log("Knowledge documents seeded successfully!");
    } else {
      console.log("Database already has knowledge documents.");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}