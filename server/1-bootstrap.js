/**
 * Semat Essence Accelerator
 * Copyright (C) 2013 Daniel Graziotin. All Rights Reserved.
 * Licensed under the BSD 3-Clause. See the LICENSE File for details.
 */

/**
 * This file contains the pre-defined description of the database when a Project is created.
 * That is, the Concerns, Alphas, and States are defined here.
 * Additionally, the description of all the entities can be found in this file.
 */

kernelSkeleton = {
    concerns: [{
        name: 'Customer',
        description: 'Description of Customer',
        alphas: [{
            name: 'Opportunity',
            currentState: null,
            states: ['Identified', 'Solution Needed', 'Value Established', 'Viable', 'Addressed', 'Benefit Accrued']
        }, {
            name: 'Stakeholders',
            currentState: null,
            states: ['Recognized', 'Represented', 'Involved', 'In Agreement', 'Satisfied for Deployment', 'Satisfied in Use']
        }]
    }, {
        name: 'Solution',
        description: 'Description of Solution',
        alphas: [{
            name: 'Requirements',
            currentState: null,
            states: ['Conceived', 'Bounded', 'Coherent', 'Acceptable', 'Addressed', 'Fulfilled']
        }, {
            name: 'Software System',
            currentState: null,
            states: ['Architecture Selected', 'Demonstrable', 'Usable', 'Ready', 'Operational', 'Retired']
        }]
    }, {
        name: 'Endeavor',
        description: 'Description of Endeavor',
        alphas: [{
            name: 'Work',
            currentState: null,
            states: ['Initiated', 'Prepared', 'Started', 'Under Control', 'Concluded', 'Closed']
        }, {
            name: 'Team',
            currentState: null,
            states: ['Seeded', 'Formed', 'Collaborating', 'Performing', 'Adjourned']
        }, {
            name: 'Way-of-Working',
            currentState: null,
            states: ['Principles Established', 'Foundation Established', 'In Use', 'In Place', 'Working Well', 'Retired']
        }]
    }]
};

alphaDescriptions = {
    'opportunity': 'The set of circumstances that makes it appropriate to ' + 'develop or change a software system. <br/> The opportunity articulates the' + 'reason for the creation of the new, or changed, software system. It ' + 'represents the team\'s shared understanding of the stakeholders\' needs, ' + 'and helps shape the requirements for the new software system by providing ' + 'justification for its development.',

    'stakeholders': 'The people, groups, or organizations who affect or are ' + 'affected by a software system. <br/> The stakeholders provide the ' + 'opportunity and are the source of the requirements and funding for the ' + 'software system. They must be involved throughout the software' + 'engineering endeavor to support the team and ensure that an acceptable ' + 'software system is produced.',

    'requirements': 'What the software system must do to address the ' + 'opportunity and satisfy the stakeholders. <br/> It is important to ' + 'discover what is needed from the software system, share this understanding ' + 'among the stakeholders and the team members, and use it to drive the ' + 'development and testing of the new system.',

    'software system': 'A system made up of software, hardware, and data that ' + 'provides its primary value by the execution of the software. <br/>' + 'The primary product of any software engineering endeavor, a software ' + 'system can be part of a larger software, hardware or business solution.',

    'work': 'Activity involving mental or physical effort done in order to ' + 'achieve a result. <br/> In the context of software engineering, work is ' + 'everything that the team does to meet the goals of producing a software ' + 'system matching the requirements, and addressing the opportunity, ' + 'presented by the customer. The work is guided by the practices that make ' + 'up the team\'s way-of-working.',

    'team': 'The group of people actively engaged in the development, ' + 'maintenance, delivery and support of a specific software system. ' + 'The team plans and performs the work needed to update and change ' + 'the software system.',

    'way-of-working': 'The tailored set of practices and tools used by a team ' + 'to guide and support their work. The team evolves their way of working ' + 'alongside their understanding of their mission and their working ' + 'environment. As their work proceeds they continually reflect on their ' + 'way of working and adapt it as necessary to their current context.'
};

stateDescriptions = {
    'stakeholders': {
        'recognized': '<p>All the different groups of stakeholders that are, or will be, affected by the development and operation of the software system are identified. <br/>' + 'There is agreement on the stakeholder groups to be represented. At a minimum, the stakeholders groups that fund, use, support, and maintain the system have been considered. <br/> ' + 'The responsibilities of the stakeholder representatives have been defined.</p>',

        'represented': '<p>The stakeholder representatives have agreed to take on their responsibilities.<br/>' + 'The stakeholder representatives are authorized to carry out their responsibilities. <br/>' + 'The collaboration approach among the stakeholder representatives has been agreed. <br/>' + 'The stakeholder representatives support and respect the team\'s way of working.</p>',

        'involved': '<p>The stakeholder representatives assist the team in accordance with their responsibilities.<br />' + 'The stakeholder representatives provide feedback and take part in decision making in a timely manner.<br />' + 'The stakeholder representatives promptly communicate changes that are relevant for their stakeholder groups.</p>',

        'in agreement': '<p>The stakeholder representatives have agreed upon their minimal expectations for the next deployment of the new system.<br />' + 'The stakeholder representatives are happy with their involvement in the work.<br />' + 'The stakeholder representatives agree that their input is valued by the team and treated with respect.<br />' + 'The team members agree that their input is valued by the stakeholder representatives and treated with respect.<br />' + 'The stakeholder representatives agree with how their different priorities and perspectives are being balanced to provide a clear direction for the team.</p>',

        'satisfied for deployment': '<p>The stakeholder representatives provide feedback on the system from their stakeholder group perspective.<br />' + 'The stakeholder representatives confirm that the system is ready for deployment.</p>',

        'satisfied in use': '<p>Stakeholders are using the new system and providing feedback on their experiences.<br />' + 'The stakeholders confirm that the new system meets their expectations.</p>'
    },
    'opportunity': {
        'identified': '<p>An idea for a way of improving current ways of working, increasing market share or applying a new or innovative software system has been identified.<br />' + 'At least one of the stakeholders wishes to make an investment in better understanding the opportunity and the value associated with addressing it.<br />' + 'The other stakeholders who share the opportunity have been identified.</p>',

        'solution needed': '<p>The stakeholders in the opportunity and the proposed solution have been identified.<br />' + 'The stakeholders\' needs that generate the opportunity have been established.<br />' + 'Any underlying problems and their root causes have been identified.<br />' + 'It has been confirmed that a software-based solution is needed.<br />' + 'At least one software-based solution has been proposed.</p>',

        'value established': '<p>The value of addressing the opportunity has been quantified either in absolute terms or in returns or savings per time period (e.g. per annum).<br />' + 'The impact of the solution on the stakeholders is understood.<br />' + 'The value that the software system offers to the stakeholders that fund and use the software system is understood.<br />' + 'The success criteria by which the deployment of the software system is to be judged are clear.<br /> ' + 'The desired outcomes required of the solution are clear and quantified.</p>',

        'viable': '<p>A solution has been outlined.<br />' + 'The indications are that the solution can be developed and deployed within constraints.<br />' + 'The risks associated with the solution are acceptable and manageable.<br />' + 'The indicative (ball-park) costs of the solution are less than the anticipated value of the opportunity.<br />' + 'The reasons for the development of a software-based solution are understood by all members of the team.<br />' + 'It is clear that the pursuit of the opportunity is viable.</p>',

        'addressed': '<p>A usable system that demonstrably addresses the opportunity is available.<br />' + 'The stakeholders agree that the available solution is worth deploying.<br />' + 'The stakeholders are satisfied that the solution produced addresses the opportunity.</p>',

        'benefit accrued': '<p>The solution has started to accrue benefits for the stakeholders.<br />' + 'The return-on-investment profile is at least as good as anticipated.</p>'
    },
    'requirements': {
        'conceived': '<p>The initial set of stakeholders agrees that a system is to be produced.<br />' + 'The stakeholders that will use the new system are identified.<br />' + 'The stakeholders that will fund the initial work on the new system are identified.<br />' + 'There is a clear opportunity for the new system to address.</p>',

        'bounded': '<p>The stakeholders involved in developing the new system are identified.<br />' + 'The stakeholders agree on the purpose of the new system.<br />' + 'It is clear what success is for the new system.<br />' + 'The stakeholders have a shared understanding of the extent of the proposed solution.<br />' + 'The way the requirements will be described is agreed upon.<br />' + 'The mechanisms for managing the requirements are in place.<br />' + 'The prioritization scheme is clear.<br />' + 'Constraints are identified and considered.<br />' + 'Assumptions are clearly stated.</p>',

        'coherent': '<p>The requirements are captured and shared with the team and the stakeholders.<br />' + 'The origin of the requirements is clear.<br />' + 'The rationale behind the requirements is clear.<br />' + 'Conflicting requirements are identified and attended to.<br />' + 'The requirements communicate the essential characteristics of the system to be delivered.<br />' + 'The most important usage scenarios for the system can be explained.<br />' + 'The priority of the requirements is clear.<br />' + 'The impact of implementing the requirements is understood.<br />' + 'The team understands what has to be delivered and agrees to deliver it.</p>',

        'acceptable': '<p>The stakeholders accept that the requirements describe an acceptable solution.<br />' + 'The rate of change to the agreed requirements is relatively low and under control.<br />' + 'The value provided by implementing the requirements is clear.<br />' + 'The parts of the opportunity satisfied by the requirements are clear.</p>',

        'addressed': '<p>Enough of the requirements are addressed for the resulting system to be acceptable to the stakeholders.<br />' + 'The stakeholders accept the requirements as accurately reflecting what the system does and does not do.<br />' + 'The set of requirement items implemented provide clear value to the stakeholders.<br />' + 'The system implementing the requirements is accepted by the stakeholders as worth making operational.</p>',

        'fulfilled': '<p>The stakeholders accept the requirements as accurately capturing what they require to fully satisfy the need for a new system.<br />' + 'There are no outstanding requirement items preventing the system from being accepted as fully satisfying the requirements.<br />' + 'The system is accepted by the stakeholders as fully satisfying the requirements.</p>'
    },
    'software system': {
        'architecture selected': '<p>The criteria to be used when selecting the architecture have been agreed on.<br />' + 'Hardware platforms have been identified.<br />' + 'Programming languages and technologies to be used have been selected.<br />' + 'System boundary is known.<br />' + 'Significant decisions about the organization of the system have been made.<br />' + 'Buy, build and reuse decisions have been made.</p>',

        'demonstrable': '<p>Key architectural characteristics have been demonstrated.<br />' + 'The system can be exercised and its performance can be measured.<br />' + 'Critical hardware configurations have been demonstrated.<br />' + 'Critical interfaces have been demonstrated.<br />' + 'The integration with other existing systems has been demonstrated.<br />' + 'The relevant stakeholders agree that the demonstrated architecture is appropriate.</p>',

        'usable': '<p>The system can be operated by stakeholders who use it.<br />' + 'The functionality provided by the system has been tested.<br />' + 'The performance of the system is acceptable to the stakeholders.<br />' + 'Defect levels are acceptable to the stakeholders.<br />' + 'The system is fully documented.<br />' + 'Release content is known.<br />' + 'The added value provided by the system is clear.</p>',

        'ready': '<p>Installation and other user documentation are available.<br />' + 'The stakeholder representatives accept the system as fit-for-purpose.<br />' + 'The stakeholder representatives want to make the system operational.<br />' + 'Operational support is in place.</p>',

        'operational': '<p>The system has been made available to the stakeholders intended to use it.<br />' + 'At least one example of the system is fully operational.<br />' + 'The system is fully supported to the agreed service levels.</p>',

        'retired': '<p>The system has been replaced or discontinued.<br />' + 'The system is no longer supported.<br />' + 'There are no &ldquo;official&rdquo; stakeholders who still use the system.<br />' + 'Updates to the system will no longer be produced.</p>'
    },
    'work': {
        'initiated': '<p>The result required of the work being initiated is clear.<br />' + 'Any constraints on the work&rsquo;s performance are clearly identified.<br />' + 'The stakeholders that will fund the work are known.<br />' + 'The initiator of the work is clearly identified.<br />' + 'The stakeholders that will accept the results are known.<br />' + 'The source of funding is clear.<br />' + 'The priority of the work is clear.</p>',

        'prepared': '<p>Commitment is made.<br />' + 'Cost and effort of the work are estimated.<br />' + 'Resource availability is understood.<br />' + 'Governance policies and procedures are clear.<br />' + 'Risk exposure is understood.<br />' + 'Acceptance criteria are defined and agreed with client.<br />' + 'The work is broken down sufficiently for productive work to start.<br />' + 'Work items have been identified and prioritized by the team and stakeholders.<br />' + 'A credible plan is in place.<br />' + 'Funding to start the work is in place.<br />' + 'The team is ready to start the work.<br />' + 'Integration and delivery points are defined.</p>',

        'started': '<p>Development work has been started.<br />' + 'Work progress is monitored.<br />' + 'The work is being broken down into actionable work items with clear definitions of done.<br />' + 'Team members are accepting and progressing work items.</p>',

        'under control': '<p>Work items are being completed.<br />' + 'Unplanned work is under control.<br />' + 'Risks are under control as the impact if they occur and the likelihood of them occurring have been reduced to acceptable levels.<br />' + 'Estimates are revised to reflect the team&rsquo;s performance.<br />' + 'Measures are available to show progress and velocity.<br />' + 'Re-work is under control.<br />' + 'Work items are consistently completed on time and within their estimates.</p>',

        'concluded': '<p>All outstanding work items are administrative housekeeping or related to preparing the next piece of work.<br />' + 'Work results are being achieved.<br />' + 'The client has accepted the resulting software system.</p>',

        'closed': '<p>Lessons learned have been itemized, recorded and discussed.<br />' + 'Metrics have been made available.<br />' + 'Everything has been archived.<br />' + 'The budget has been reconciled and closed.<br />' + 'The team has been released.<br />' + 'There are no outstanding, uncompleted work items.</p>'
    },
    'team': {
        'seeded': '<p>The team mission has been defined in terms of the opportunities and outcomes.<br />' + 'Constraints on the team\'s operation are known.<br />' + 'Mechanisms to grow the team are in place.<br />' + 'The composition of the team is defined.<br />' + 'Any constraints on where and how the work is carried out are defined.<br />' + 'The team\'s responsibilities are outlined.<br />' + 'The level of team commitment is clear.<br />' + 'Required competencies are identified.<br />' + 'The team size is determined.<br />' + 'Governance rules are defined.<br />' + 'Leadership model is selected.</p>',

        'formed': '<p>Individual responsibilities are understood.<br />' + 'Enough team members have been recruited to enable the work to progress.<br />' + 'Every team member understands how the team is organized.<br />' + 'All team members understand how to perform their work.<br />' + 'The team members have met (perhaps virtually) and are beginning to get to know each other<br />' + 'The team members understand their responsibilities and how they align with their competencies.<br />' + 'Team members are accepting work.<br />' + 'Any external collaborators (organizations, teams and individuals) are identified.<br />' + 'Team communication mechanisms have been defined.<br />' + 'Each team member commits to working on the team as defined.</p>',

        'collaborating': '<p>The team is working as one cohesive unit.<br />' + 'Communication within the team is open and honest.<br />' + 'The team is focused on achieving the team mission.<br />' + 'The team members put the success of the team as a whole ahead of their own personal objectives.<br />' + 'The team members know each other.</p>',

        'performing': '<p>The team consistently meets its commitments.<br />' + 'The team continuously adapts to the changing context.<br />' + 'The team identifies and addresses problems without outside help.<br />' + 'The team is consistently producing high quality output.<br />' + 'The team is considered a high performance team.<br />' + 'Effective progress is being achieved with minimal avoidable backtracking and reworking.<br />' + 'Wasted work, and the potential for wasted work are continuously eliminated.</p>',

        'adjourned': '<p>The team responsibilities have been handed over or fulfilled.<br />' + 'The team members are available for assignment to other teams.<br />' + 'No further effort is being put in by the team to complete the mission.</p>'
    },

    'way-of-working': {
        'principles established': '<p>Principles and constraints are committed to by the team.<br />' + 'Principles and constraints are agreed to by the stakeholders.<br />' + 'The practice needs of the work and its stakeholders are agreed.<br />' + 'The tool needs of the work and its stakeholders are agreed.<br />' + 'A recommendation for the approach to be taken is available.<br />' + 'The context within which the team will operate is understood.<br />' + 'The constraints that apply to the selection and use of practices and tools are known.<br />' + 'The constraints that govern the selection and acquisition of the team\'s practices and tools are known.</p>',

        'foundation established': '<p>The key practices and tools that form the foundation of the way-of-working are selected.<br />' + 'Enough practices for work to start are agreed to by the team.<br />' + 'All non-negotiable practices and tools have been identified.<br />' + 'The gaps that exist between the practices and tools that are needed and the practices and tools that are available have been analyzed and understood.<br />' + 'The capability gaps that exist between what is needed to execute the desired way of working and the capability levels of the team have been analyzed and understood.<br />' + 'The selected practices and tools have been integrated to form a usable way-of-working.</p>',

        'in use': '<p>The practices and tools are being used to do real work.<br />' + 'The use of the practices and tools selected is regularly inspected.<br />' + 'The practices and tools are being adapted to the team&rsquo;s context.<br />' + 'The use of the practices and tools is supported by the team.<br />' + 'Procedures are in place to handle feedback on the team&rsquo;s way of working.<br />' + 'The practices and tools support team working and collaboration.</p>',

        'in place': '<p>The practices and tools are being used by the whole team to perform their work.<br />' + 'All team members have access to the practices and tools required to do their work.<br />' + 'The whole team is involved in the inspection and adaptation of the way-of-working.</p>',

        'working well': '<p>Team members are making progress as planned by using and adapting the way-of-working to suit their current context.<br />' + 'The team naturally applies the practices without thinking about them<br />' + 'The tools naturally support the way that the team works.<br />' + 'The team continually tunes their use of the practices and tools.</p>',

        'retired': '<p>The team\'s way of working is no longer being used.<br />' + 'Lessons learned are shared for future use.</p>'
    }
};
