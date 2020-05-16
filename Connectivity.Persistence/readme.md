# Mongo DB setuping

1. Download <a href="https://www.mongodb.com/download-center" target="_blank">Mongo DB</a>
2. Run MongoDB windows service that mongo db always works in background locally
3. Add mongo to PATH variable

```typescript
mongod --install --config "D:\Mongo\mongod.cfg"
net start MongoDB
```

***Note***: You may use mongod.cfg in the Connectivity.Persistence project as initial config to run Mongo DB win service.

