// layouts
import Layout from '@/_global/layouts';

// ----------------------------------------------------------------------

OrganizationSwitch.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout>{page}</Layout>;
};
  
// ----------------------------------------------------------------------
  
export default function OrganizationSwitch() {
    return "organization switch";
}