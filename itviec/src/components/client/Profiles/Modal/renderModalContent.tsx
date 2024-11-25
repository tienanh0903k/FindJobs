import { ModalType } from '../ProfileInfo';

import dynamic from 'next/dynamic';
import SkillsModal from './SkillsModal';


const ExperienceModal = dynamic(() => import('./ExperienceModal'), { ssr: false });
const PersonalModal = dynamic(() => import('./PersonalModal'), { ssr: false });
const IntroduceModal = dynamic(() => import('./IntroduceModal'), { ssr: false });
const EducationModal = dynamic(() => import('./EducationModal'), { ssr: false });




const RenderModalContent = (modalType: ModalType, onClose: () => void) => {
  switch (modalType) {
    case ModalType.PERSONAL:
      return <PersonalModal onClose={onClose} />;

    case ModalType.SKILLS:
      return <SkillsModal onClose={onClose}/>
    
    case ModalType.EXPERIENCE:
      return <>
          <ExperienceModal />
      </>

    case ModalType.INTRODUCE:
      return <>
          <IntroduceModal onClose={onClose}/>
      </>;

    case ModalType.EDUCATION:
      return <>
          <EducationModal onClose={onClose}/>
      </>;
    default:
      return null;
  }
};

export default RenderModalContent;
