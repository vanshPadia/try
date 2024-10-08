import {
  EditOutlined,
  FileTextOutlined,
  TeamOutlined,
  ProjectOutlined,
  BulbOutlined,
  LockOutlined,
} from '@ant-design/icons'
import {
  LandingContainer,
  LandingCTA,
  LandingFAQ,
  LandingFeatures,
  LandingHero,
  LandingHowItWorks,
  LandingPainPoints,
  LandingPricing,
  LandingSocialProof,
  LandingSocialRating,
  LandingTestimonials,
} from '~/designSystem'

export default function LandingPage() {
  const features = [
    {
      heading: `Rich Text & Markdown Mastery`,
      description: `Express your ideas with powerful formatting options, from simple notes to complex documents.`,
      icon: <EditOutlined />,
    },
    {
      heading: `Smart Organization`,
      description: `Categorize and structure your notes effortlessly with our intuitive organization system.`,
      icon: <FileTextOutlined />,
    },
    {
      heading: `Real-Time Collaboration`,
      description: `Work seamlessly with your team, sharing ideas and editing in real-time.`,
      icon: <TeamOutlined />,
    },
    {
      heading: `Visual Brainstorming`,
      description: `Unleash your creativity with visual boards for mind mapping and idea generation.`,
      icon: <BulbOutlined />,
    },
    {
      heading: `Integrated Task Management`,
      description: `Turn your notes into actionable tasks and manage projects efficiently.`,
      icon: <ProjectOutlined />,
    },
    {
      heading: `Secure and Private`,
      description: `Keep your ideas safe with our robust security measures and encryption.`,
      icon: <LockOutlined />,
    },
  ]

  const testimonials = [
    {
      name: `Sarah Johnson`,
      designation: `Project Manager`,
      content: `This app has revolutionized how our team collaborates. We're more organized and productive than ever!`,
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
    {
      name: `David Chen`,
      designation: `Freelance Writer`,
      content: `As a writer, having all my ideas in one place is crucial. This app does that and so much more. It's my digital brain!`,
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
    {
      name: `Emily Rodriguez`,
      designation: `UX Designer`,
      content: `The visual boards are a game-changer for my design process. It's like having a digital whiteboard always at hand.`,
      avatar: 'https://randomuser.me/api/portraits/women/27.jpg',
    },
    {
      name: `Michael Okonkwo`,
      designation: `Startup Founder`,
      content: `This app has become the central hub for all our company's knowledge. It's indispensable for our growth.`,
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
    {
      name: `Lisa Thompson`,
      designation: `Graduate Student`,
      content: `Organizing my research has never been easier. I can focus on my studies instead of struggling with multiple apps.`,
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
    {
      name: `Alex Novak`,
      designation: `Product Manager`,
      content: `The seamless integration of notes, tasks, and collaboration tools has streamlined our product development process.`,
      avatar: 'https://randomuser.me/api/portraits/men/17.jpg',
    },
  ]

  const navItems = [
    {
      title: `Features`,
      link: `#features`,
    },
    {
      title: `Pricing`,
      link: `#pricing`,
    },
    {
      title: `FAQ`,
      link: `#faq`,
    },
  ]

  const packages = [
    {
      title: `Personal`,
      description: `Perfect for individual users`,
      monthly: 9,
      yearly: 89,
      features: [`Unlimited notes`, `5GB storage`, `Basic collaboration`],
    },
    {
      title: `Pro`,
      description: `Ideal for professionals and small teams`,
      monthly: 19,
      yearly: 189,
      features: [
        `Everything in Personal`,
        `Unlimited storage`,
        `Advanced collaboration`,
        `Priority support`,
      ],
      highlight: true,
    },
    {
      title: `Enterprise`,
      description: `For large organizations with custom needs`,
      monthly: 49,
      yearly: 489,
      features: [
        `Everything in Pro`,
        `Custom integrations`,
        `Dedicated account manager`,
        `On-premise option`,
      ],
    },
  ]

  const questionAnswers = [
    {
      question: `How secure is my data?`,
      answer: `We use industry-standard encryption and security measures to keep your data safe. Your information is encrypted both in transit and at rest.`,
    },
    {
      question: `Can I collaborate with others?`,
      answer: `Absolutely! Our app offers real-time collaboration features, allowing you to share notes and work together with team members seamlessly.`,
    },
    {
      question: `Is there a limit to how many notes I can create?`,
      answer: `No, there's no limit to the number of notes you can create. Our goal is to provide you with a space for all your ideas and information.`,
    },
    {
      question: `Can I access my notes offline?`,
      answer: `Yes, you can access and edit your notes offline. Changes will sync automatically once you're back online.`,
    },
  ]

  const logos = [
    { url: 'https://i.imgur.com/afwBIFK.png' },
    { url: 'https://i.imgur.com/LlloOPa.png' },
    { url: 'https://i.imgur.com/j8jPb4H.png' },
    { url: 'https://i.imgur.com/mJ1sZFv.png' },
  ]

  const steps = [
    {
      heading: `Sign Up`,
      description: `Create your account in seconds and dive into a world of organized thinking.`,
    },
    {
      heading: `Capture Ideas`,
      description: `Start creating notes, mind maps, and to-do lists with our intuitive interface.`,
    },
    {
      heading: `Collaborate`,
      description: `Invite team members to contribute, comment, and bring ideas to life together.`,
    },
    {
      heading: `Achieve More`,
      description: `Watch your productivity soar as you turn scattered thoughts into actionable plans.`,
    },
  ]

  const painPoints = [
    {
      emoji: `🤯`,
      title: `Overwhelmed by information overload`,
    },
    {
      emoji: `🔍`,
      title: `Wasting time searching for notes across multiple apps`,
    },
    {
      emoji: `🏃‍♀️`,
      title: `Struggling to keep up with scattered tasks and deadlines`,
    },
  ]

  const avatarItems = [
    {
      src: 'https://randomuser.me/api/portraits/men/51.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/women/9.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/women/52.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
  ]

  return (
    <LandingContainer navItems={navItems}>
      <LandingHero
        title={`Unleash Your Productivity: Where Ideas Thrive and Teams Flourish`}
        subtitle={`Transform scattered thoughts into organized brilliance. Collaborate seamlessly, brainstorm visually, and achieve more with our all-in-one productivity powerhouse.`}
        buttonText={`Start Your Journey`}
        pictureUrl={`https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/YwWTlF-notetakingapp-Zuaa`}
        socialProof={
          <LandingSocialRating
            avatarItems={avatarItems}
            numberOfUsers={10000}
            suffixText={`productivity enthusiasts`}
          />
        }
      />
      <LandingSocialProof logos={logos} title={`Trusted by Industry Leaders`} />
      <LandingPainPoints
        title={`Reclaim 9.3 Hours of Your Week: The Cost of Disorganization`}
        painPoints={painPoints}
      />
      <LandingHowItWorks
        title={`Your Path to Peak Productivity`}
        steps={steps}
      />
      <LandingFeatures
        id="features"
        title={`Empower Your Workflow: Tools That Work as Hard as You Do`}
        subtitle={`Discover how our features can transform your productivity and creativity.`}
        features={features}
      />
      <LandingTestimonials
        title={`Success Stories: How Our Users Achieved Their Dreams`}
        subtitle={`Join thousands who have revolutionized their work and life.`}
        testimonials={testimonials}
      />
      <LandingPricing
        id="pricing"
        title={`Invest in Your Productivity, Invest in Your Future`}
        subtitle={`Choose the plan that fits your ambition.`}
        packages={packages}
      />
      <LandingFAQ
        id="faq"
        title={`Got Questions? We've Got Answers`}
        subtitle={`Everything you need to know about maximizing your productivity with our app.`}
        questionAnswers={questionAnswers}
      />
      <LandingCTA
        title={`Ready to Transform Your Productivity?`}
        subtitle={`Join thousands of professionals who've already taken the leap. Your future self will thank you.`}
        buttonText={`Start Your Free Trial`}
        buttonLink={`/register`}
      />
    </LandingContainer>
  )
}
