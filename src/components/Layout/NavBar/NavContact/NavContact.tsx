import { navigationContactListQuery } from '../api/navigationContactListQuery';

export const NavContact = async () => {
  const { data } = await navigationContactListQuery();

  console.log('dupa', data);

  return <div></div>;
};
