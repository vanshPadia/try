import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const splitSql = (sql: string) => {
  return sql.split(';').filter(content => content.trim() !== '')
}

async function main() {
  const sql = `

INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('90cd64b7-e886-4218-ac36-af9c2a127b5a', '1Hobart9@yahoo.com', 'Michael White', 'https://i.imgur.com/YfJQV5z.png?id=3', 'inv789ghi', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('fd1a0ccb-2bc0-4cb7-aec4-ba0bb694f592', '9Velda_Fadel25@gmail.com', 'Michael White', 'https://i.imgur.com/YfJQV5z.png?id=11', 'inv123abc', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('9cbce8ed-180d-406c-93bb-edf026389d75', '25Mona98@hotmail.com', 'Alex Jones', 'https://i.imgur.com/YfJQV5z.png?id=27', 'inv123abc', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('e6d40fe8-690d-4686-a22c-2843de780d68', '33Raoul.Schuster@gmail.com', 'Michael White', 'https://i.imgur.com/YfJQV5z.png?id=35', 'inv012jkl', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('1cd3c29a-472b-40da-a805-4aea0fc9298e', '41Kaelyn12@yahoo.com', 'Alex Jones', 'https://i.imgur.com/YfJQV5z.png?id=43', 'inv123abc', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('1439ce08-341d-4f64-93e8-a5c5d5bd7796', '49Vicky_Lemke12@gmail.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=51', 'inv456def', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('9fb601a1-8c97-441f-8a9e-fcd7cbe7ef02', '57Bennie_Hammes10@yahoo.com', 'Michael White', 'https://i.imgur.com/YfJQV5z.png?id=59', 'inv345mno', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('f6b10bb3-e5ed-4333-8430-9bdc8dfe8132', '65Kyleigh_Williamson8@hotmail.com', 'Michael White', 'https://i.imgur.com/YfJQV5z.png?id=67', 'inv012jkl', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('88c91df4-7d7b-40dd-88f5-4236a4887b4a', '73Allie85@hotmail.com', 'Emily Brown', 'https://i.imgur.com/YfJQV5z.png?id=75', 'inv789ghi', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('8c104810-a6d3-4a34-98ea-7d77a321fa1e', 'Creative Solutions LLC', 'https://i.imgur.com/YfJQV5z.png?id=82');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('9557fd0c-ce4b-4c86-811d-d82014fdaca9', 'Tech Innovators Inc.', 'https://i.imgur.com/YfJQV5z.png?id=85');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('2a1cdbeb-b4cf-4aca-8b9d-998445eba412', 'NextGen Enterprises', 'https://i.imgur.com/YfJQV5z.png?id=88');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('13dcc295-b286-458a-ba99-6b19a57eec78', 'Creative Solutions LLC', 'https://i.imgur.com/YfJQV5z.png?id=91');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('d2159308-b887-4e72-88ff-5c095070bc7e', 'Global Synergy Group', 'https://i.imgur.com/YfJQV5z.png?id=94');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('62a76854-4a2b-4e15-823b-53fec0dc4678', 'Tech Innovators Inc.', 'https://i.imgur.com/YfJQV5z.png?id=97');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('934ae49d-ac96-49e9-9f12-8cdc240064f2', 'Tech Innovators Inc.', 'https://i.imgur.com/YfJQV5z.png?id=100');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('cbfe0030-cb96-4cc5-9b92-e3c46b05c4e6', 'Tech Innovators Inc.', 'https://i.imgur.com/YfJQV5z.png?id=103');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('eaba231d-004c-4b71-ba4a-bdff1683cd06', 'Creative Solutions LLC', 'https://i.imgur.com/YfJQV5z.png?id=106');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('dcb44dfe-ea9e-4759-9f09-e587bb649f4b', 'Creative Solutions LLC', 'https://i.imgur.com/YfJQV5z.png?id=109');

INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('a1c95204-1036-4720-85b8-1e9d3ad444f5', 'Contributor', 'e6d40fe8-690d-4686-a22c-2843de780d68', 'cbfe0030-cb96-4cc5-9b92-e3c46b05c4e6');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('1eee11a6-b255-405e-946a-49f3292e7c02', 'Contributor', 'fd1a0ccb-2bc0-4cb7-aec4-ba0bb694f592', '8c104810-a6d3-4a34-98ea-7d77a321fa1e');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('c9c472db-a088-4bb8-b018-785f98d61e9c', 'Editor', '9cbce8ed-180d-406c-93bb-edf026389d75', 'eaba231d-004c-4b71-ba4a-bdff1683cd06');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('eede02d7-a816-4835-9155-c93d940bfdae', 'Editor', '88c91df4-7d7b-40dd-88f5-4236a4887b4a', '9557fd0c-ce4b-4c86-811d-d82014fdaca9');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('5460aee1-dbdc-4e19-add1-693b605d793e', 'Manager', 'fd1a0ccb-2bc0-4cb7-aec4-ba0bb694f592', '9557fd0c-ce4b-4c86-811d-d82014fdaca9');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('752d3244-f7bb-4e0d-af24-88c19d668d7c', 'Viewer', '1439ce08-341d-4f64-93e8-a5c5d5bd7796', 'dcb44dfe-ea9e-4759-9f09-e587bb649f4b');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('479e2556-4a19-48ad-a03d-56cc41dfc95f', 'Contributor', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '2a1cdbeb-b4cf-4aca-8b9d-998445eba412');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('16c7d3a4-50f7-4ce2-bf70-a3c1e9102893', 'Administrator', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '8c104810-a6d3-4a34-98ea-7d77a321fa1e');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('290e07e8-5ae8-4565-ab8c-57fa17052317', 'Viewer', 'e6d40fe8-690d-4686-a22c-2843de780d68', '13dcc295-b286-458a-ba99-6b19a57eec78');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('18da9e09-06a6-40cb-b764-9906ffd3fcc3', 'Contributor', '9fb601a1-8c97-441f-8a9e-fcd7cbe7ef02', 'eaba231d-004c-4b71-ba4a-bdff1683cd06');

INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('7928ae38-eb3f-48a9-bc21-6b4095357964', 'Quarterly team collaboration insights', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('dacc9344-0487-48f8-94c0-6c0d964fbe9f', 'Special offers and discounts on premium plans', 'f6b10bb3-e5ed-4333-8430-9bdc8dfe8132');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('1b082334-e85a-43bf-a78c-697c4182a90f', 'Exclusive access to beta features', '1cd3c29a-472b-40da-a805-4aea0fc9298e');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('acc867f8-24b2-479a-85f9-09f13b62618f', 'Exclusive access to beta features', '90cd64b7-e886-4218-ac36-af9c2a127b5a');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('e0c7e530-6b50-43c6-8d67-a9661c8a764c', 'Exclusive access to beta features', '1439ce08-341d-4f64-93e8-a5c5d5bd7796');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('f3984fb0-8a1a-4e9a-aa0d-e315696e39ac', 'Quarterly team collaboration insights', '1439ce08-341d-4f64-93e8-a5c5d5bd7796');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('69e863b7-7e60-4be0-a5cc-44126bf8a7ec', 'Special offers and discounts on premium plans', '1cd3c29a-472b-40da-a805-4aea0fc9298e');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('82aee902-22ab-4585-93d3-d9c2c581d131', 'Exclusive access to beta features', 'e6d40fe8-690d-4686-a22c-2843de780d68');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('f71fce16-276c-497c-8bdf-03dcfb357f00', 'Special offers and discounts on premium plans', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('9fefe553-cc17-4d40-8edc-f30d095ca549', 'Special offers and discounts on premium plans', '9cbce8ed-180d-406c-93bb-edf026389d75');

INSERT INTO "Media" ("id", "mediaUrl", "type") VALUES ('67345ed5-a314-4dad-9418-814ccc9b9599', 'https://i.imgur.com/YfJQV5z.png?id=151', 'video');
INSERT INTO "Media" ("id", "mediaUrl", "type") VALUES ('7e29c19c-2a6c-4502-a7bc-00f390531bd0', 'https://i.imgur.com/YfJQV5z.png?id=154', 'image');
INSERT INTO "Media" ("id", "mediaUrl", "type") VALUES ('2473c6bd-397a-422d-9b18-1828d0e99238', 'https://i.imgur.com/YfJQV5z.png?id=157', 'audio');
INSERT INTO "Media" ("id", "mediaUrl", "type") VALUES ('25f887c6-adae-4fce-baef-315ad0f81a05', 'https://i.imgur.com/YfJQV5z.png?id=160', 'image');
INSERT INTO "Media" ("id", "mediaUrl", "type") VALUES ('f129bc15-79bc-4c24-8236-bf2dcfb12b39', 'https://i.imgur.com/YfJQV5z.png?id=163', 'audio');
INSERT INTO "Media" ("id", "mediaUrl", "type") VALUES ('e176e456-a45e-4392-9918-b0dbae2fcf43', 'https://i.imgur.com/YfJQV5z.png?id=166', 'audio');
INSERT INTO "Media" ("id", "mediaUrl", "type") VALUES ('5e4292ca-deff-4bb7-b4b6-06d644c8642a', 'https://i.imgur.com/YfJQV5z.png?id=169', 'image');
INSERT INTO "Media" ("id", "mediaUrl", "type") VALUES ('9738136e-16e5-4780-8559-88d30f7d3c0d', 'https://i.imgur.com/YfJQV5z.png?id=172', 'document');
INSERT INTO "Media" ("id", "mediaUrl", "type") VALUES ('752f030b-9981-46e9-9356-9bdb76f29749', 'https://i.imgur.com/YfJQV5z.png?id=175', 'document');
INSERT INTO "Media" ("id", "mediaUrl", "type") VALUES ('b4872871-3757-437a-8929-4bd542a9cb7d', 'https://i.imgur.com/YfJQV5z.png?id=178', 'video');

INSERT INTO "Notebook" ("id", "name", "description", "userId") VALUES ('d549572d-7ab9-4333-905f-74a90a42f171', 'Project Ideas', 'Notes and action items from team meetings.', '9fb601a1-8c97-441f-8a9e-fcd7cbe7ef02');
INSERT INTO "Notebook" ("id", "name", "description", "userId") VALUES ('8b9940e8-ff2a-4706-8373-cba5ccc53c45', 'Project Ideas', 'A collection of potential projects and concepts to explore.', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Notebook" ("id", "name", "description", "userId") VALUES ('7c1e1bf3-6d3c-4513-9575-2eee551699c1', 'Daily Journal', 'Notes and action items from team meetings.', '1cd3c29a-472b-40da-a805-4aea0fc9298e');
INSERT INTO "Notebook" ("id", "name", "description", "userId") VALUES ('2d89b600-a07c-44d9-a254-c9d55434a963', 'Project Ideas', 'Summaries and insights from various research papers.', 'fd1a0ccb-2bc0-4cb7-aec4-ba0bb694f592');
INSERT INTO "Notebook" ("id", "name", "description", "userId") VALUES ('4fcc1732-c6c2-4bd6-a4f0-30f52301d8c9', 'Daily Journal', 'Daily reflections and thoughts.', 'f6b10bb3-e5ed-4333-8430-9bdc8dfe8132');
INSERT INTO "Notebook" ("id", "name", "description", "userId") VALUES ('b7c73e37-624f-4c79-ad35-b2b02bd61f10', 'Research Articles', 'Goals and strategies for personal growth.', '1439ce08-341d-4f64-93e8-a5c5d5bd7796');
INSERT INTO "Notebook" ("id", "name", "description", "userId") VALUES ('150201aa-bab6-426e-bdd5-520f9d68249f', 'Team Meeting Notes', 'Summaries and insights from various research papers.', 'fd1a0ccb-2bc0-4cb7-aec4-ba0bb694f592');
INSERT INTO "Notebook" ("id", "name", "description", "userId") VALUES ('c268ce28-81d2-4497-9dc8-866ca4a56371', 'Research Articles', 'A collection of potential projects and concepts to explore.', '9cbce8ed-180d-406c-93bb-edf026389d75');
INSERT INTO "Notebook" ("id", "name", "description", "userId") VALUES ('679e9c20-1fd3-4f69-a2eb-d01ec6336eff', 'Daily Journal', 'Daily reflections and thoughts.', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Notebook" ("id", "name", "description", "userId") VALUES ('7f7bc7de-b47e-4316-84fa-f2df47c202fa', 'Team Meeting Notes', 'Summaries and insights from various research papers.', '88c91df4-7d7b-40dd-88f5-4236a4887b4a');

INSERT INTO "Board" ("id", "name", "description", "userId") VALUES ('83a39aaf-0534-4758-b409-5dbb52014b7f', 'Project Planning Board', 'A board dedicated to outlining the steps and resources needed for successful project execution.', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Board" ("id", "name", "description", "userId") VALUES ('9e91d014-fdf3-4313-bb3e-0f6a7aaa8b02', 'Project Planning Board', 'A board used for tracking the progress of product development from concept to launch.', '90cd64b7-e886-4218-ac36-af9c2a127b5a');
INSERT INTO "Board" ("id", "name", "description", "userId") VALUES ('32cd4d47-afda-42f4-ae9a-a4653f047df4', 'Team Collaboration Board', 'A collaborative space for team members to share updates and work together on ongoing projects.', '88c91df4-7d7b-40dd-88f5-4236a4887b4a');
INSERT INTO "Board" ("id", "name", "description", "userId") VALUES ('baf6f9cc-7fb8-4f72-a341-2f2edefc61d4', 'Marketing Strategy Board', 'A board dedicated to outlining the steps and resources needed for successful project execution.', '1cd3c29a-472b-40da-a805-4aea0fc9298e');
INSERT INTO "Board" ("id", "name", "description", "userId") VALUES ('57d5c37b-1f08-4562-a8cf-a8e583aa6cb7', 'Product Development Board', 'A board used for tracking the progress of product development from concept to launch.', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Board" ("id", "name", "description", "userId") VALUES ('89d984fa-d03f-42e5-8108-6d957b4f8379', 'Project Planning Board', 'A board dedicated to outlining the steps and resources needed for successful project execution.', '88c91df4-7d7b-40dd-88f5-4236a4887b4a');
INSERT INTO "Board" ("id", "name", "description", "userId") VALUES ('a74a5ac2-3b0b-4cd3-b107-92aa017546d6', 'Creative Ideas Board', 'A board dedicated to outlining the steps and resources needed for successful project execution.', '88c91df4-7d7b-40dd-88f5-4236a4887b4a');
INSERT INTO "Board" ("id", "name", "description", "userId") VALUES ('8da37d12-2ea0-4051-be22-37ce2248934d', 'Project Planning Board', 'This board focuses on developing and refining marketing strategies for upcoming campaigns.', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Board" ("id", "name", "description", "userId") VALUES ('cc8219bf-9c79-410c-b129-b5b41f837870', 'Creative Ideas Board', 'A collaborative space for team members to share updates and work together on ongoing projects.', 'f6b10bb3-e5ed-4333-8430-9bdc8dfe8132');
INSERT INTO "Board" ("id", "name", "description", "userId") VALUES ('a973335f-18da-464f-92ba-ce10f4d130e8', 'Team Collaboration Board', 'A board used for tracking the progress of product development from concept to launch.', '90cd64b7-e886-4218-ac36-af9c2a127b5a');

INSERT INTO "Note" ("id", "title", "content", "notebookId") VALUES ('3fbb22db-44f8-4efe-b202-c0077c4d8b40', 'Project Launch Plan', 'Discussed the timeline and key milestones for the upcoming project launch. Assigned tasks to team members.', '150201aa-bab6-426e-bdd5-520f9d68249f');
INSERT INTO "Note" ("id", "title", "content", "notebookId") VALUES ('04197483-0c02-49cd-994d-e95f906939ae', 'Weekly Team Meeting Notes', 'A wishlist of potential features for the next product update including user feedback and suggestions.', 'd549572d-7ab9-4333-905f-74a90a42f171');
INSERT INTO "Note" ("id", "title", "content", "notebookId") VALUES ('698dbe9a-dc9f-4d9a-a359-3c4eb0c7c211', 'Product Feature Wishlist', 'Summary of the weekly team meeting held on Monday. Key points include project updates and upcoming deadlines.', '7f7bc7de-b47e-4316-84fa-f2df47c202fa');
INSERT INTO "Note" ("id", "title", "content", "notebookId") VALUES ('fe5cd5d7-1724-4e0b-ac88-c52a6e03913a', 'Weekly Team Meeting Notes', 'A wishlist of potential features for the next product update including user feedback and suggestions.', '4fcc1732-c6c2-4bd6-a4f0-30f52301d8c9');
INSERT INTO "Note" ("id", "title", "content", "notebookId") VALUES ('afc60dcd-0286-49b0-8898-798c77d0209a', 'Project Launch Plan', 'An overview of the marketing strategy for Q4 focusing on digital campaigns and customer engagement.', 'd549572d-7ab9-4333-905f-74a90a42f171');
INSERT INTO "Note" ("id", "title", "content", "notebookId") VALUES ('ce546100-05f8-4df6-8bbd-5fbf1f52facc', 'Research on AI Trends', 'Discussed the timeline and key milestones for the upcoming project launch. Assigned tasks to team members.', '8b9940e8-ff2a-4706-8373-cba5ccc53c45');
INSERT INTO "Note" ("id", "title", "content", "notebookId") VALUES ('49e2c994-b806-4e5c-a00f-c0bdcd235225', 'Marketing Strategy Overview', 'Discussed the timeline and key milestones for the upcoming project launch. Assigned tasks to team members.', '150201aa-bab6-426e-bdd5-520f9d68249f');
INSERT INTO "Note" ("id", "title", "content", "notebookId") VALUES ('23e4c9f2-767e-4212-a11b-3f589bdb2912', 'Weekly Team Meeting Notes', 'An overview of the marketing strategy for Q4 focusing on digital campaigns and customer engagement.', 'c268ce28-81d2-4497-9dc8-866ca4a56371');
INSERT INTO "Note" ("id", "title", "content", "notebookId") VALUES ('e1e5c38b-bf71-469d-b7d3-7950a78b442d', 'Weekly Team Meeting Notes', 'A comprehensive research document on the latest trends in artificial intelligence and their potential impact.', '150201aa-bab6-426e-bdd5-520f9d68249f');
INSERT INTO "Note" ("id", "title", "content", "notebookId") VALUES ('0b4fdc9a-5743-4258-ae33-3223a1dcffab', 'Weekly Team Meeting Notes', 'A wishlist of potential features for the next product update including user feedback and suggestions.', '2d89b600-a07c-44d9-a254-c9d55434a963');

INSERT INTO "Task" ("id", "title", "description", "status", "boardId", "assigneeId") VALUES ('a29736cc-c6c0-4f28-ac74-30ed36cda115', 'Review Team Feedback', 'Set up a meeting to discuss project milestones and deliverables.', 'Completed', '89d984fa-d03f-42e5-8108-6d957b4f8379', 'fd1a0ccb-2bc0-4cb7-aec4-ba0bb694f592');
INSERT INTO "Task" ("id", "title", "description", "status", "boardId", "assigneeId") VALUES ('e42d607a-678b-41ec-8c2d-ca0524310899', 'Review Team Feedback', 'Draft the initial project proposal document for client review.', 'In Progress', '8da37d12-2ea0-4051-be22-37ce2248934d', '88c91df4-7d7b-40dd-88f5-4236a4887b4a');
INSERT INTO "Task" ("id", "title", "description", "status", "boardId", "assigneeId") VALUES ('79a5cc0a-9cc2-40e8-b393-77d409ca801e', 'Prepare Presentation Slides', 'Create slides for the upcoming quarterly business review presentation.', 'Not Started', 'a74a5ac2-3b0b-4cd3-b107-92aa017546d6', 'e6d40fe8-690d-4686-a22c-2843de780d68');
INSERT INTO "Task" ("id", "title", "description", "status", "boardId", "assigneeId") VALUES ('74506f28-ae0e-4e17-9552-de6fb1bae6bf', 'Review Team Feedback', 'Create slides for the upcoming quarterly business review presentation.', 'Not Started', '8da37d12-2ea0-4051-be22-37ce2248934d', '9cbce8ed-180d-406c-93bb-edf026389d75');
INSERT INTO "Task" ("id", "title", "description", "status", "boardId", "assigneeId") VALUES ('74980928-38fc-4a74-b49c-1841c6e2e7c0', 'Organize Team Meeting', 'Draft the initial project proposal document for client review.', 'Not Started', 'cc8219bf-9c79-410c-b129-b5b41f837870', '1439ce08-341d-4f64-93e8-a5c5d5bd7796');
INSERT INTO "Task" ("id", "title", "description", "status", "boardId", "assigneeId") VALUES ('37a297f6-7e8b-49c4-8946-e8a2f884cc6c', 'Prepare Presentation Slides', 'Revise the current marketing strategy to align with new business goals.', 'Cancelled', '89d984fa-d03f-42e5-8108-6d957b4f8379', '90cd64b7-e886-4218-ac36-af9c2a127b5a');
INSERT INTO "Task" ("id", "title", "description", "status", "boardId", "assigneeId") VALUES ('5e885f3f-51bd-4c26-be6d-8f78d59fadc2', 'Complete Project Proposal', 'Set up a meeting to discuss project milestones and deliverables.', 'Not Started', '8da37d12-2ea0-4051-be22-37ce2248934d', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Task" ("id", "title", "description", "status", "boardId", "assigneeId") VALUES ('cc283d5f-6763-45de-bab8-7015f66119dc', 'Complete Project Proposal', 'Draft the initial project proposal document for client review.', 'Not Started', '83a39aaf-0534-4758-b409-5dbb52014b7f', 'fd1a0ccb-2bc0-4cb7-aec4-ba0bb694f592');
INSERT INTO "Task" ("id", "title", "description", "status", "boardId", "assigneeId") VALUES ('8b638b64-22e2-496c-b494-5d47b44ab7d5', 'Review Team Feedback', 'Draft the initial project proposal document for client review.', 'On Hold', 'cc8219bf-9c79-410c-b129-b5b41f837870', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Task" ("id", "title", "description", "status", "boardId", "assigneeId") VALUES ('7867bbb8-eb3b-484a-9de9-96e6e11a626e', 'Prepare Presentation Slides', 'Draft the initial project proposal document for client review.', 'On Hold', '9e91d014-fdf3-4313-bb3e-0f6a7aaa8b02', '1cd3c29a-472b-40da-a805-4aea0fc9298e');

INSERT INTO "Notification" ("id", "content", "isRead", "userId") VALUES ('0aff83af-33b9-49a5-9f65-81700ae725b2', 'You have a new comment on your note.', true, '88c91df4-7d7b-40dd-88f5-4236a4887b4a');
INSERT INTO "Notification" ("id", "content", "isRead", "userId") VALUES ('4804c8da-0d54-45ef-a0bf-1c399aa1275c', 'John mentioned you in a note.', true, '1439ce08-341d-4f64-93e8-a5c5d5bd7796');
INSERT INTO "Notification" ("id", "content", "isRead", "userId") VALUES ('dcb5279f-26d1-4a80-8ee0-e061b7ab475a', 'Your note Meeting Agenda was updated.', true, '88c91df4-7d7b-40dd-88f5-4236a4887b4a');
INSERT INTO "Notification" ("id", "content", "isRead", "userId") VALUES ('4d6e9eda-681f-490f-b7b8-87577919d3c1', 'Task Project Plan Review is due tomorrow.', true, '90cd64b7-e886-4218-ac36-af9c2a127b5a');
INSERT INTO "Notification" ("id", "content", "isRead", "userId") VALUES ('750f8719-5589-4a5d-98c4-e3c592275f69', 'New file uploaded to Team Collaboration board.', false, '88c91df4-7d7b-40dd-88f5-4236a4887b4a');
INSERT INTO "Notification" ("id", "content", "isRead", "userId") VALUES ('34abbb92-c104-4af3-83ea-c159f4f2b8f1', 'You have a new comment on your note.', false, '90cd64b7-e886-4218-ac36-af9c2a127b5a');
INSERT INTO "Notification" ("id", "content", "isRead", "userId") VALUES ('85a93ba9-636f-4d3b-96ff-08b8c78f18d2', 'Task Project Plan Review is due tomorrow.', true, '90cd64b7-e886-4218-ac36-af9c2a127b5a');
INSERT INTO "Notification" ("id", "content", "isRead", "userId") VALUES ('b39e2100-db23-43fa-aab6-d8233c4ed7ed', 'New file uploaded to Team Collaboration board.', false, 'f6b10bb3-e5ed-4333-8430-9bdc8dfe8132');
INSERT INTO "Notification" ("id", "content", "isRead", "userId") VALUES ('25b7cbf0-4909-468b-a999-4ad2752a2341', 'New file uploaded to Team Collaboration board.', true, '88c91df4-7d7b-40dd-88f5-4236a4887b4a');
INSERT INTO "Notification" ("id", "content", "isRead", "userId") VALUES ('332859ee-049a-487e-a201-c9cc8022fa1f', 'Task Project Plan Review is due tomorrow.', true, '88c91df4-7d7b-40dd-88f5-4236a4887b4a');

INSERT INTO "NoteMedia" ("noteId", "mediaId", "id") VALUES ('23e4c9f2-767e-4212-a11b-3f589bdb2912', '25f887c6-adae-4fce-baef-315ad0f81a05', '2d3e7f55-5b59-449f-b412-57471fec1a00');
INSERT INTO "NoteMedia" ("noteId", "mediaId", "id") VALUES ('23e4c9f2-767e-4212-a11b-3f589bdb2912', 'e176e456-a45e-4392-9918-b0dbae2fcf43', '9965028c-f650-49b1-9d58-c3aaee67e0c0');
INSERT INTO "NoteMedia" ("noteId", "mediaId", "id") VALUES ('fe5cd5d7-1724-4e0b-ac88-c52a6e03913a', '67345ed5-a314-4dad-9418-814ccc9b9599', '99a5bf7f-8f38-4408-92a1-5133af2d7a2d');
INSERT INTO "NoteMedia" ("noteId", "mediaId", "id") VALUES ('fe5cd5d7-1724-4e0b-ac88-c52a6e03913a', 'f129bc15-79bc-4c24-8236-bf2dcfb12b39', 'e679cacb-f9f0-40e5-93c6-64552665f7f0');
INSERT INTO "NoteMedia" ("noteId", "mediaId", "id") VALUES ('3fbb22db-44f8-4efe-b202-c0077c4d8b40', 'e176e456-a45e-4392-9918-b0dbae2fcf43', '6f2db448-fc6d-4cbe-833b-831afa16235b');
INSERT INTO "NoteMedia" ("noteId", "mediaId", "id") VALUES ('23e4c9f2-767e-4212-a11b-3f589bdb2912', '9738136e-16e5-4780-8559-88d30f7d3c0d', '3ba8c806-e8cd-486f-809f-7a5d87c3420b');
INSERT INTO "NoteMedia" ("noteId", "mediaId", "id") VALUES ('ce546100-05f8-4df6-8bbd-5fbf1f52facc', '752f030b-9981-46e9-9356-9bdb76f29749', '6dacee34-24d0-457e-8dc0-577857786b53');
INSERT INTO "NoteMedia" ("noteId", "mediaId", "id") VALUES ('fe5cd5d7-1724-4e0b-ac88-c52a6e03913a', '67345ed5-a314-4dad-9418-814ccc9b9599', '1a183a4d-7547-441f-bfe1-7ffdbed866b4');
INSERT INTO "NoteMedia" ("noteId", "mediaId", "id") VALUES ('ce546100-05f8-4df6-8bbd-5fbf1f52facc', '5e4292ca-deff-4bb7-b4b6-06d644c8642a', '43672f55-6ed8-479a-9cd9-a13f39db9c8f');
INSERT INTO "NoteMedia" ("noteId", "mediaId", "id") VALUES ('04197483-0c02-49cd-994d-e95f906939ae', 'f129bc15-79bc-4c24-8236-bf2dcfb12b39', '6f8d3900-19d0-42b0-bddc-68ea00b82e0e');

INSERT INTO "TaskMedia" ("taskId", "mediaId", "id") VALUES ('5e885f3f-51bd-4c26-be6d-8f78d59fadc2', 'f129bc15-79bc-4c24-8236-bf2dcfb12b39', 'f0e81a89-c9f6-4023-9dba-ece4878616bf');
INSERT INTO "TaskMedia" ("taskId", "mediaId", "id") VALUES ('74506f28-ae0e-4e17-9552-de6fb1bae6bf', '25f887c6-adae-4fce-baef-315ad0f81a05', '8e870b9d-a118-45ae-bb64-ce866e22d581');
INSERT INTO "TaskMedia" ("taskId", "mediaId", "id") VALUES ('a29736cc-c6c0-4f28-ac74-30ed36cda115', 'e176e456-a45e-4392-9918-b0dbae2fcf43', '738988c8-b33d-49f9-a8ed-5d492adacef2');
INSERT INTO "TaskMedia" ("taskId", "mediaId", "id") VALUES ('74506f28-ae0e-4e17-9552-de6fb1bae6bf', 'b4872871-3757-437a-8929-4bd542a9cb7d', '2e52fe85-dbc5-44cb-ac08-911cdb400e0f');
INSERT INTO "TaskMedia" ("taskId", "mediaId", "id") VALUES ('79a5cc0a-9cc2-40e8-b393-77d409ca801e', '67345ed5-a314-4dad-9418-814ccc9b9599', 'a83d085f-3a06-4eb1-8042-6b8e3ad50914');
INSERT INTO "TaskMedia" ("taskId", "mediaId", "id") VALUES ('5e885f3f-51bd-4c26-be6d-8f78d59fadc2', '9738136e-16e5-4780-8559-88d30f7d3c0d', '9226bd96-f8db-4b60-8b40-1196c2e50fc4');
INSERT INTO "TaskMedia" ("taskId", "mediaId", "id") VALUES ('5e885f3f-51bd-4c26-be6d-8f78d59fadc2', 'e176e456-a45e-4392-9918-b0dbae2fcf43', '8fd5f850-8206-4e80-868f-357887b500ce');
INSERT INTO "TaskMedia" ("taskId", "mediaId", "id") VALUES ('e42d607a-678b-41ec-8c2d-ca0524310899', '5e4292ca-deff-4bb7-b4b6-06d644c8642a', '98f6fa19-4f42-4f3a-b92d-a4186c980608');
INSERT INTO "TaskMedia" ("taskId", "mediaId", "id") VALUES ('7867bbb8-eb3b-484a-9de9-96e6e11a626e', 'b4872871-3757-437a-8929-4bd542a9cb7d', '74877656-7bcd-451a-8de8-47b58b9c9899');
INSERT INTO "TaskMedia" ("taskId", "mediaId", "id") VALUES ('a29736cc-c6c0-4f28-ac74-30ed36cda115', '9738136e-16e5-4780-8559-88d30f7d3c0d', 'e8269185-657d-4803-abc8-3a7a6ecd4f1c');

  `

  const sqls = splitSql(sql)

  for (const sql of sqls) {
    try {
      await prisma.$executeRawUnsafe(`${sql}`)
    } catch (error) {
      console.log(`Could not insert SQL: ${error.message}`)
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
