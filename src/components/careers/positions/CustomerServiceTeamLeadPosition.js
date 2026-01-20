import { Icon } from "@iconify/react";

const CustomerServiceTeamLeadPosition = () => {
  return (
    <div id="team-lead" className="bg-white rounded-lg border border-gray-200 shadow-sm opacity-75">
      <div className="p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 pb-6 border-b border-gray-200">
          <div className="flex-1">
            <h3 className="text-2xl sm:text-3xl font-bold text-ccsa-dark-blue mb-3">
              Customer Service Team Lead
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-100 text-red-700 rounded-md text-sm font-medium">
                <Icon icon="mdi:close-circle" width={16} height={16} />
                Position Closed
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm font-medium">
                <Icon icon="mdi:map-marker" width={16} height={16} />
                Nairobi, Kenya
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm font-medium">
                <Icon icon="mdi:briefcase" width={16} height={16} />
                Full-time
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-ccsa-blue/10 text-ccsa-blue rounded-md text-sm font-medium">
                <Icon icon="mdi:account-group" width={16} height={16} />
                Leadership Role
              </span>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-ccsa-dark-blue mb-3 flex items-center gap-2">
                <Icon icon="mdi:file-document-outline" width={20} height={20} className="text-ccsa-blue" />
                Job Description
              </h4>
              <p className="text-gray-700 leading-relaxed">
                We are looking for an experienced and dynamic Customer Service Team Lead to oversee and guide 
                our team of customer service agents. As a Team Lead, you will be responsible for ensuring 
                exceptional service delivery, coaching team members, and driving performance improvements 
                while maintaining high standards of customer satisfaction.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-ccsa-dark-blue mb-3 flex items-center gap-2">
                <Icon icon="mdi:check-circle-outline" width={20} height={20} className="text-ccsa-blue" />
                Key Responsibilities
              </h4>
              <ul className="space-y-2.5 text-gray-700">
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Supervise and manage a team of customer service agents, ensuring optimal performance and productivity</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Monitor call quality, customer interactions, and service metrics to identify areas for improvement</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Provide coaching, training, and feedback to team members to enhance their skills and performance</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Handle escalated customer issues and complex inquiries with professionalism and efficiency</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Develop and implement strategies to improve team performance and customer satisfaction scores</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Prepare and present performance reports to management on team metrics and achievements</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Foster a positive team environment and ensure adherence to company policies and procedures</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-ccsa-dark-blue mb-3 flex items-center gap-2">
                <Icon icon="mdi:account-star-outline" width={20} height={20} className="text-ccsa-blue" />
                Requirements
              </h4>
              <ul className="space-y-2.5 text-gray-700">
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Bachelor's degree in Business, Communications, or related field preferred</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Minimum 2-3 years of experience in customer service, with at least 1 year in a supervisory or team lead role</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Proven leadership skills with the ability to motivate and inspire team members</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Excellent communication, interpersonal, and conflict resolution skills</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Strong analytical skills and experience with performance metrics and reporting</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Proficiency in CRM systems, call center software, and Microsoft Office Suite</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Ability to work flexible hours including evenings, weekends, and holidays as needed</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-ccsa-dark-blue mb-3 flex items-center gap-2">
                <Icon icon="mdi:gift-outline" width={20} height={20} className="text-ccsa-blue" />
                What We Offer
              </h4>
              <ul className="space-y-2.5 text-gray-700">
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Competitive salary package with leadership bonuses and performance incentives</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Leadership development programs and opportunities for career advancement</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Comprehensive health insurance and retirement benefits</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Opportunity to make a significant impact on team performance and customer experience</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Collaborative work environment with supportive management</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerServiceTeamLeadPosition;

