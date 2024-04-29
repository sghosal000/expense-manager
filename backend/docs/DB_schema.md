1. user:
    - username (String unique)
    - email (String unique)
    - password (String)
    - fname (String)
    - lname (String)
    - age (Number)
    - maritalatatus (boolean)
    - createdAt (Date)
    - updatedAt (Date)
2. category:
    - name (String unique)
    - type (enum: ['income', 'expense', 'investment'])
3. usercategory:
    - categoryid (objectid ref category)
    - userid (objectid ref user)
4. transaction
    - userid (objectid ref user)
    - amount (number)
    - date (date default date.now)
    - note (string)
    - type (enum: ['income', 'expense', 'investment'])
    - categoryid (objectid ref category)
    - recurringid (objectid ref recurringtransaction)
5. recurringtransaction
    - user (objectid ref user)
    - amount: (number)
    - type (enum: ['income', 'expense', 'investment'])
    - categoryid (objectid ref category) 
    - startDate: Date
    - frequency: {
        - interval: (number)
        - unit: (['days', 'weeks', 'months', 'years'])  
    }
    - note: string
    - nextExecutionDate: (Date default startDate)
    