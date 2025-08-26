import { BoltIcon, UsersIcon, ChartBarIcon } from "@heroicons/react/24/outline";

export default function Features() {
  const features = [
    {
      name: "Lightning Fast",
      description: "Experience instant task management with zero lag.",
      icon: BoltIcon,
    },
    {
      name: "Team Collaboration",
      description: "Work seamlessly with your teammates in real time.",
      icon: UsersIcon,
    },
    {
      name: "Advanced Analytics",
      description: "Track progress and productivity with smart insights.",
      icon: ChartBarIcon,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature) => (
          <div key={feature.name} className="text-center">
            <feature.icon className="mx-auto h-12 w-12 text-primary" />
            <h3 className="mt-4 text-lg font-semibold">{feature.name}</h3>
            <p className="mt-2 text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
