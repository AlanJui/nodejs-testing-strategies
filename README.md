# 專案摘要

NodeJS 平台，測試個案範例，學習測試工具 Mocha, sinon 之用法。

內容取自 Pluralsihgt 課程：
[Node.js Testing Strategies](https://app.pluralsight.com/library/courses/nodejs-testing-strategies/table-of-contents)

## 學習重點：

 - 如何使用 NodeJS 「內附」的模組- assert ，做「測試結果斷言」
    * assert(args.db, "Need a DB instance");
    * assert(decision.success, decision.message);
    * ssert.ok(err === null, err);
    * assert(decision.assignment);
    * assert(!decision.success);

 - 如何確認程式碼中某「物件（Object）」的「方法（method）」的確有被呼叫？ 
    * sinon.spy
    * sinon.spy(review,"ensureAppValid")

 - 如何利用「Stub 傳回可預期的回傳值」，用以驗證：程式碼可根據不同的「回傳值」，進行不同的處理
    * sinon.stub(db, "getMissionByLaunchDate").yields(null,null);
    * sinon.stub(db, "createNextMission").yields(null,mission);

