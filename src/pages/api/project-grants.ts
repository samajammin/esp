import jsforce from 'jsforce';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;
  const {
    firstName: FirstName,
    lastName: LastName,
    email: Email,
    company: Company,
    projectName: Project_Name__c,
    website: Website,
    github: Github_Link__c,
    twitter: Twitter__c,
    teamProfile: Team_Profile__c,
    projectDescription: Project_Description__c,
    projectCategory: Category__c,
    requestedAmount: Requested_Amount__c,
    city: npsp__CompanyCity__c,
    country: npsp__CompanyCountry__c,
    timezone: Time_Zone__c,
    howDidYouHearAboutESP: Referral_Source__c,
    referralSourceIfOther: Referral_Source_if_Other__c,
    referrals: Referrals__c,
    uploadProposal
  } = body;
  const { SF_PROD_LOGIN_URL, SF_PROD_USERNAME, SF_PROD_PASSWORD, SF_PROD_SECURITY_TOKEN } =
    process.env;

  const conn = new jsforce.Connection({
    // you can change loginUrl to connect to sandbox or prerelease env.
    loginUrl: SF_PROD_LOGIN_URL
  });

  conn.login(SF_PROD_USERNAME!, `${SF_PROD_PASSWORD}${SF_PROD_SECURITY_TOKEN}`, err => {
    if (err) {
      return console.error(err);
    }

    let createdLeadID: string;

    // Single record creation
    conn.sobject('Lead').create(
      {
        FirstName,
        LastName,
        Email,
        Company,
        Project_Name__c,
        Website,
        Github_Link__c,
        Twitter__c,
        Team_Profile__c,
        Project_Description__c,
        Category__c,
        Requested_Amount__c,
        npsp__CompanyCity__c,
        npsp__CompanyCountry__c,
        Time_Zone__c,
        Referral_Source__c,
        Referral_Source_if_Other__c,
        Referrals__c
        // TODO: add RecordTypeId: 'Project Grants' when defined
      },
      (err, ret) => {
        if (err || !ret.success) {
          console.error(err);
          res.status(400).json({ status: 'fail' });
        } else {
          console.log(`Project Grants Lead with ID: ${ret.id} has been created!`);

          createdLeadID = ret.id;
          console.log({ createdLeadID });

          // Document upload
          conn.sobject('ContentVersion').create(
            {
              Title: `[PROPOSAL] ${Project_Name__c} - ${createdLeadID}`,
              PathOnClient: uploadProposal.path,
              VersionData: uploadProposal.content // base64 encoded file content
            },
            async (err, uploadedFile) => {
              if (err || !uploadedFile.success) {
                console.error(err);

                res.status(400).json({ status: 'fail' });
              } else {
                console.log({ uploadedFile });
                console.log(`Document has been uploaded succesfully!`);

                const contentDocument = await conn
                  .sobject<{
                    Id: string;
                    ContentDocumentId: string;
                  }>('ContentVersion')
                  .retrieve(uploadedFile.id);

                await conn.sobject('ContentDocumentLink').create({
                  ContentDocumentId: contentDocument.ContentDocumentId,
                  LinkedEntityId: createdLeadID,
                  ShareType: 'V'
                });

                res.status(200).json({ status: 'ok' });
              }
            }
          );
        }
      }
    );
  });
}