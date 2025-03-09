import { getDocumentsQuery } from '../Footer/api/getDocumentsQuery';
import { AcceptPolicyAlertDialog } from './AcceptPolicyAlertDialog/AcceptPolicyAlertDialog';

export const AcceptPolicyAlert = async () => {
  const { data } = await getDocumentsQuery();

  if (!data) return null;

  return <AcceptPolicyAlertDialog {...data} />;
};
