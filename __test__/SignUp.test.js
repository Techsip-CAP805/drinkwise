import { validatePasswordReq, validateConfirmPassword, validateExistingEmail } from '../src/pages/signUp';

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

test('Customer Sign Up validateExistingEmail()', () => {
    let result = validateExistingEmail('newuser@test.com', mockCustomers);
    expect(result).toBeFalsy();
    result = validateExistingEmail('matthew@example.com', mockCustomers);
    expect(result).toBeTruthy();
});

test('Customer Sign Up validatePasswordReq()', () => {
    let result = validatePasswordReq('invalidpassword');
    expect(result).toBeFalsy();
    result = validatePasswordReq('strongpassword123!');
    expect(result).toBeTruthy();
});

test('Customer Sign Up validateConfirmPassword()', () => {
    let result = validateConfirmPassword('strongpassword123!', 'differentpassword');
    expect(result).toBeFalsy();
    result = validateConfirmPassword('strongpassword123!', 'strongpassword123!');
    expect(result).toBeTruthy();
});