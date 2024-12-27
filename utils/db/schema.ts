// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {integer,varchar,pgTable,serial,text,timestamp,jsonb,boolean, point} from 'drizzle-orm/pg-core'
export const Users = pgTable('user',{
    id:serial('id').primaryKey(),
    email:varchar('email',{length:255}).notNull().unique(),
    name:varchar('name',{length:255}).notNull(),
    createdAt:timestamp('created_at').defaultNow().notNull()
})

export const Reports = pgTable('reports',{
    id:serial('id').primaryKey(),
    userId:integer('user_id').references(()=>Users.id).notNull(),
    location:text('location').notNull(),
    wasteType:varchar('waste_type',{length:255}).notNull(),
    amount:varchar('amount',{length:255}).notNull(),
    imageUrl:text('image_url'),
    verifycationResult:jsonb('verification_result'),
    status:varchar('status',{length:255}).notNull().default('pending'),
    createdAt:timestamp('created_at').defaultNow().notNull(),
    collectorId:integer('collector_id').references(()=>Users.id),
})

export const Rewards = pgTable('reward',{
    id:serial('id').primaryKey(),
    userId:integer('user_id').references(()=>Users.id).notNull(),
    point:integer('point').notNull().default(0),
    createdAt:timestamp('created_at').defaultNow().notNull(),
    updatedAt:timestamp('updated_at').defaultNow().notNull(),
    isAvailble:boolean('is_available').notNull().default(true),
    description:text('description'),
    name:varchar('name',{length:255}).notNull(),
    collectionInfo:text('collection_info').notNull(),

})
export const CollectedWastes = pgTable('collected_waste',{
    id:serial('id').primaryKey(),
    reportId:integer('report_id').references(()=>Reports.id).notNull(),
    collectorId:integer('collector_id').references(()=>Users.id).notNull(),
    collectionDate:timestamp('collection_date').notNull(),
    status:varchar('status',{length:255}).notNull().default('collected'),
})
export const Notifications = pgTable('notification',{
    id:serial('id').primaryKey(),
    userId:integer('user_id').references(()=>Users.id).notNull(),
    message:text('message').notNull(),
    type:varchar('type',{length:50}).notNull(),
    isRead:boolean('is_read').notNull().default(false),
    createdAt:timestamp('created_at').defaultNow().notNull(),


})
export const Transactions = pgTable("transactions", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => Users.id).notNull(),
    type: varchar("type", { length: 20 }).notNull(), // 'earned' or 'redeemed'
    amount: integer("amount").notNull(),
    description: text("description").notNull(),
    date: timestamp("date").defaultNow().notNull(),
  });