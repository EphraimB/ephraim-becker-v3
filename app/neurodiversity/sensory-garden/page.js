import NeurodiversityDistrict from '../../../components/NeurodiversityDistrict';

export const metadata = {
  title: 'Ares City Park - Sensory Garden',
  description: 'Tune lighting glare, sound decibels, citizens density, and sweep speeds inside the interactive Martian biodome sensory adaptation simulator.',
};

export default function SensoryGardenPage() {
  return <NeurodiversityDistrict activeSector="sensory" />;
}
