import { isValid } from '../src/pages/login';

const mockCustomers = [
    {
        "_id": {
            "$oid": "6675d916df0ee7992b11b8c0"
        },
        "username": "matthew_king",
        "customerName": "Matthew King",
        "emailAddress": "matthew@example.com",
        "password": "hashedpassword123",
        "preferredBranch": "downtown",
        "accountCreationDate": "2024-11-11T13:45:00.000Z",
        "orders": []
    },
    {
        "_id": {
            "$oid": "6675d916df0ee7992b11b8c1"
        },
        "username": "mia_rodriguez",
        "customerName": "Mia Rodriguez",
        "emailAddress": "mia@example.com",
        "password": "hashedpassword456",
        "preferredBranch": "richmonhill_yonge",
        "accountCreationDate": "2024-12-03T10:00:00.000Z",
        "orders": []
    }
];

test('Customer Login isValid()', () => {
    let result = isValid('test@example.com', 'anypassword', mockCustomers);
    expect(result).toBeFalsy();
    result = isValid('matthew@example.com', 'invalidpassword', mockCustomers);
    expect(result).toBeFalsy();
    result = isValid('mia@example.com', 'hashedpassword456', mockCustomers);
    expect(result).toBeTruthy();
});

