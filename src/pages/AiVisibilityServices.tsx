import ServicePage from './ServicePage';
import Methodology from '../components/Methodology';
import Pricing from '../components/Pricing';
import { AI_VISIBILITY_SERVICE } from '../data/servicePages';

interface Props {
  onOpenDiagnostic: () => void;
  onOpenChecklist: () => void;
}

// Flagship service page: the standard ServicePage template + the existing
// Methodology (Find -> Understand -> Trust -> Recommend) and Pricing sections
// injected via extraSections.
const AiVisibilityServices: React.FC<Props> = ({ onOpenDiagnostic, onOpenChecklist }) => (
  <ServicePage
    data={AI_VISIBILITY_SERVICE}
    onOpenDiagnostic={onOpenDiagnostic}
    onOpenChecklist={onOpenChecklist}
    extraSections={
      <>
        <Methodology />
        <Pricing onOpenDiagnostic={onOpenDiagnostic} />
      </>
    }
  />
);

export default AiVisibilityServices;
