import { Icon } from "@iconify/react";

const CustomerServiceAgentsPosition = () => {
  return (
    <div id="customer-service-agents" className="bg-white rounded-lg border border-gray-200 shadow-sm opacity-75">
      <div className="p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 pb-6 border-b border-gray-200">
          <div className="flex-1">
            <h3 className="text-2xl sm:text-3xl font-bold text-ccsa-dark-blue mb-3">
              Customer Service Agents
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
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm font-medium">
                <Icon icon="mdi:clock-outline" width={16} height={16} />
                Flexible Hours
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
                We are seeking dedicated and customer-focused Customer Service Agents to join our dynamic team. 
                As a Customer Service Agent, you will be the first point of contact for our clients' customers, 
                providing exceptional service and support across various communication channels.
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
                  <span>Handle inbound and outbound customer calls with professionalism and empathy</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Resolve customer inquiries, complaints, and issues efficiently</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Maintain accurate records of customer interactions in CRM systems</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Follow company scripts and procedures while providing personalized service</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Meet or exceed performance metrics including call quality and customer satisfaction</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Collaborate with team members and supervisors to improve service delivery</span>
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
                  <span>High school diploma or equivalent; college degree preferred</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Excellent verbal and written communication skills in English</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Previous customer service or call center experience is a plus</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Strong problem-solving abilities and attention to detail</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Ability to work in a fast-paced environment and handle multiple tasks</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Proficiency in computer applications and CRM software</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Flexible schedule availability including evenings and weekends</span>
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
                  <span>Competitive salary and performance-based incentives</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Comprehensive training and professional development opportunities</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Health insurance and other benefits</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Supportive team environment and career growth opportunities</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Modern work environment with state-of-the-art technology</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerServiceAgentsPosition;

