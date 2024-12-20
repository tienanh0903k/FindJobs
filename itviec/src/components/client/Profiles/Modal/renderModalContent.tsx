import { ModalType } from '../ProfileInfo';

import dynamic from 'next/dynamic';
import SkillsModal from './SkillsModal';


const ExperienceModal = dynamic(() => import('./ExperienceModal'), { ssr: false });
const PersonalModal = dynamic(() => import('./PersonalModal'), { ssr: false });
const IntroduceModal = dynamic(() => import('./IntroduceModal'), { ssr: false });
const EducationModal = dynamic(() => import('./EducationModal'), { ssr: false });
const ProjectModal = dynamic(() => import('./ProjectModal'), { ssr: false });




const RenderModalContent = (modalType: ModalType, closeModal: () => void, modalData: any, handleSave: (data: any) => void) => {
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
      return <ProjectModal data={modalData} closeModal={closeModal} />;
    case ModalType.EXPERIENCE:
      return <ExperienceModal data={modalData} closeModal={closeModal} />;
    default:
      return null;
  }
};

export default RenderModalContent;
