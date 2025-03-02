import FacebookIcon from '/src/assets/icons/facebook.svg';
import AddressIcon from '/src/assets/icons/address.svg';
import EmailIcon from '/src/assets/icons/email.svg';
import PhoneIcon from '/src/assets/icons/phoneNumber.svg';

export const START_CONTACT_ICONS = {
  address: (className?: string) => <AddressIcon className={className} />,
  phoneNumber: (className?: string) => <PhoneIcon className={className} />,
  email: (className?: string) => <EmailIcon className={className} />,
};

export const END_CONTACT_ICONS = {
  facebook: (className?: string) => <FacebookIcon className={className} />,
};
