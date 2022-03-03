import { EmailAddress, PhoneNumber } from '..';




// TODO: [DEV-51] ProjectContact should extend Person
export interface ProjectContact {
  id?: string;
  description?: string;
  contactName?: string;
  phoneNumbers?: PhoneNumber[];
  emailAddresses?: EmailAddress[];
  default?: boolean;
}



// export class ProjectContact extends FourcastBase<ProjectContactInterface> implements ProjectContactInterface {

//   id!: string;
//   description!: string;
//   contactName!: string;
//   phoneNumbers!: PhoneNumber[];
//   emailAddresses!: EmailAddress[];
//   default!: boolean;

//   constructor(data: any ) {
//     super();
//     if (data){
//       this.id = data.id ? data.id : null;
//       this.description = data.description ? data.description : null;
//       this.contactName = data.contactName ? data.contactName : null;
//       this.phoneNumbers = this.createPhoneNumbers(data.phoneNumbers);
//       this.emailAddresses = this.createEmails(data.emailAddresses);
//   }
//   }

// createPhoneNumbers(phoneNumbers: PhoneNumberInterface[]) {
//   const numbers: PhoneNumber[] = [];
//   phoneNumbers.forEach(phoneNumber => {
//     numbers.push(new PhoneNumber(phoneNumber))
//   })
//   return numbers;
// }

// createEmails(emails: EmailAddressInterface[]) {
//   const addresses: EmailAddress[] = [];
//   emails.forEach(email => {
//     addresses.push(new EmailAddress(email))
//   })
//   return addresses;
// }

//   get valuesOnly() {
//     const valuesObj: ProjectContactInterface = {};
//     this.getValue(valuesObj, 'id');
//     this.getValue(valuesObj, 'description');
//     this.getValue(valuesObj, 'contactName');
//     this.getValue(valuesObj, 'phoneNumbers');
//     this.getValue(valuesObj, 'emailAddresses');
//     this.getValue(valuesObj, 'default');
//     return valuesObj;
//   }
// }


