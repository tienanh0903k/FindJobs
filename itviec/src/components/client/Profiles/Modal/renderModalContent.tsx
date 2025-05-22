import { ModalType } from '../ProfileInfo';

import dynamic from 'next/dynamic';
// import AwardModal from './AwardModal';
// import SkillsModal from './SkillsModal';
// import CertificateModal from './CertificateModal';

const AwardModal = dynamic(() => import('./AwardModal'), { ssr: false });
const CertificateModal = dynamic(() => import('./CertificateModal'), { ssr: false });
const SkillsModal = dynamic(() => import('./SkillsModal'), { ssr: false });
const ExperienceModal = dynamic(() => import('./ExperienceModal'), { ssr: false });
const PersonalModal = dynamic(() => import('./PersonalModal'), { ssr: false });
const IntroduceModal = dynamic(() => import('./IntroduceModal'), { ssr: false });
const EducationModal = dynamic(() => import('./EducationModal'), { ssr: false });
const ProjectModal = dynamic(() => import('./ProjectModal'), { ssr: false });

const RenderModalContent = (
	modalType: ModalType,
	closeModal: () => void,
	modalData: any,
	handleSave: (data: any) => void,
) => {
	switch (modalType) {
		case ModalType.PERSONAL:
			return <PersonalModal data={modalData} closeModal={closeModal} handleSave={handleSave} />;
		case ModalType.INTRODUCE:
			return <IntroduceModal data={modalData} closeModal={closeModal} handleSave={handleSave} />;
		case ModalType.SKILLS:
			return <SkillsModal data={modalData} closeModal={closeModal} />;
		case ModalType.EDUCATION:
			return <EducationModal data={modalData} closeModal={closeModal} />;
		case ModalType.PROJECTS:
			return <ProjectModal data={modalData} handleSave={handleSave} closeModal={closeModal} />;
		case ModalType.EXPERIENCE:
			return <ExperienceModal data={modalData} closeModal={closeModal} handleSave={handleSave} />;
		case ModalType.CERTIFICATES:
			return <CertificateModal data={modalData} closeModal={closeModal} handleSave={handleSave} />;
		case ModalType.AWARDS:
			return <AwardModal data={modalData} closeModal={closeModal} handleSave={handleSave} />;
		default:
			return null;
	}
};

export default RenderModalContent;
