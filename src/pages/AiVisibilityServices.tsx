import ServicePage from './ServicePage';
import Methodology from '../components/Methodology';
import Pricing from '../components/Pricing';
import { AI_VISIBILITY_SERVICE } from '../data/servicePages';
import type { NeedSlug } from '../data/inquiry';

interface Props {
  onOpenContact: (need: NeedSlug) => void;
  onOpenChecklist: () => void;
}

// Flagship service page: the standard ServicePage template + the existing
// Methodology (Find -> Understand -> Trust -> Recommend) and Pricing sections
// injected via extraSections.
const AiVisibilityServices: React.FC<Props> = ({ onOpenContact, onOpenChecklist }) => (
  <ServicePage
    data={AI_VISIBILITY_SERVICE}
    onOpenContact={onOpenContact}
    onOpenChecklist={onOpenChecklist}
    extraSections={
      <>
        <Methodology />
        <Pricing onOpenDiagnostic={() => onOpenContact('ai-visibility')} />
      </>
    }
  />
);

export default AiVisibilityServices;
