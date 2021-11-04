# Implementation Specification

- Sync Profiles: Each vehicle and each customer has its own sync profile (e.g. username/password)
- Partition Key: Using VIN as partitioning key, only car specific data in one or multiple documents is synced
- Sync Permissions: The sync permissions make sure that vehicles/customers only have access to their own information
