/**
 * Feature Pills Component
 *
 * Displays key value propositions in pill format for quick scanning.
 */
export default function FeaturePills() {
  const features = [
    { icon: '🚀', text: 'Instant Play' },
    { icon: '📱', text: 'No Install' },
    { icon: '✈️', text: 'Works Offline' },
    { icon: '🎮', text: 'Free Forever' },
  ];

  return (
    <div className='flex flex-wrap justify-center gap-2 px-4'>
      {features.map((feature, index) => (
        <div
          key={index}
          className='flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-full text-sm font-medium'
        >
          <span className='text-base'>{feature.icon}</span>
          <span>{feature.text}</span>
        </div>
      ))}
    </div>
  );
}
