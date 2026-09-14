import { Canvas } from '@react-three/fiber';
import PerfumeBottle from '../../components/PerfumeBottle';
import { OrbitControls } from '@react-three/drei';

export default function SpiderDetail({ processSteps }) {
  const scrollDown = (e) => {
    e.preventDefault();
    // Get the next section element
    const currentSection = e.target.closest('section');
    const nextSection = currentSection.nextElementSibling;

    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // If no next section, scroll to bottom
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  // Destructure each step data from the processSteps array
  const stepOne = processSteps[0] || {};
  const stepTwo = processSteps[1] || {};
  const stepThree = processSteps[2] || {};
  const stepFour = processSteps[3] || {};
  const stepFive = processSteps[4] || {};
  const stepSix = processSteps[5] || {};

  const StepTitle = ({ number, fallback }) => (
    <h3 className="font-display text-xl text-ivory mb-2">
      <span className="text-champagne italic">Step</span> {number || fallback}
    </h3>
  );

  return (
    <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        {/* Heading */}
        <p className="eyebrow text-center mb-5">From Brief to Flacon</p>
        <h2 className="font-display text-4xl lg:text-5xl font-normal text-center text-ivory ">
          The Process
        </h2>

        {/* Desktop Layout - Hidden on mobile */}
        <div className="hidden lg:block relative w-full">
          <div className="relative w-full min-h-[600px] md:min-h-[800px] flex items-center justify-center gap-12">

            {/* Center Image */}
            <div className="w-full h-[60vh] flex justify-center mb-8">
              <Canvas
                shadows
                camera={{ position: [0, 0, 25], fov: 22 }}
                gl={{ alpha: true, antialias: true }}
              >
                <ambientLight intensity={0.3} />
                <directionalLight position={[6, 6, 12]} intensity={1.2} color="#fff6e8" />
                <directionalLight position={[-6, 2, 10]} intensity={0.6} />
                <directionalLight position={[0, -3, -10]} intensity={0.8} color="#cdb98e" />
                <PerfumeBottle variant="noir" scale={2} position={[0, 0, 0]} quality="low" />
                <OrbitControls enableZoom={false} />
              </Canvas>

            </div>

            {/* Step One */}
            <div className="absolute top-0 left-0 md:top-8 md:left-8 lg:top-16 lg:left-16 xl:top-24 xl:left-24 w-48 sm:w-64 md:w-72 lg:w-80">
              <StepTitle number={stepOne.stepNumber} fallback="One" />
              <p className="text-taupe font-light text-sm leading-relaxed">
                {stepOne.stepDescription || 'No description available for step one.'}
              </p>
              <div className="mt-4 flex items-start">
                <img
                  src={`/images/line1.png`}
                  alt='line'
                  width={240}
                  height={240}
                  className="object-contain opacity-60 ml-10"
                />
              </div>
            </div>

            {/* Step Two */}
            <div className="absolute top-0 right-0 md:top-8 md:right-8 lg:top-16 lg:right-16 xl:top-24 xl:right-24 w-48 sm:w-64 md:w-72 lg:w-80 text-right">
              <StepTitle number={stepTwo.stepNumber} fallback="Two" />
              <p className="text-taupe font-light text-sm leading-relaxed">
                {stepTwo.stepDescription || 'No description available for step two.'}
              </p>
              <div className="mt-4 flex items-start justify-end">
                <img
                  src={`/images/line2.png`}
                  alt='line'
                  width={240}
                  height={240}
                  className="object-contain opacity-60 mr-10"
                />
              </div>
            </div>

            {/* Step Three */}
            <div className="absolute top-1/2 left-0 md:left-4 lg:left-12 -translate-y-1/2 w-48 sm:w-64 md:w-72 lg:w-80 flex items-center gap-2 sm:gap-4 md:gap-6">
              <div className="flex-1">
                <StepTitle number={stepThree.stepNumber} fallback="Three" />
                <p className="text-taupe font-light text-sm leading-relaxed">
                  {stepThree.stepDescription || 'No description available for step three.'}
                </p>
              </div>
              <div className="w-20 flex justify-center">
                <img
                  src={`/images/line3-4.png`}
                  alt="line"
                  width={100}
                  height={100}
                  className="opacity-60"
                />
              </div>
            </div>

            {/* Step Four */}
            <div className="absolute top-1/2 right-0 md:right-4 lg:right-12 transform -translate-y-1/2 w-48 sm:w-64 md:w-72 lg:w-80 text-right flex items-center gap-2 sm:gap-4 md:gap-6">
              <div className="w-20 flex justify-center">
                <img
                  src={`/images/line3-4.png`}
                  alt="line"
                  width={100}
                  height={100}
                  className="opacity-60"
                />
              </div>
              <div className="flex-1">
                <StepTitle number={stepFour.stepNumber} fallback="Four" />
                <p className="text-taupe font-light text-sm leading-relaxed">
                  {stepFour.stepDescription || 'No description available for step four.'}
                </p>
              </div>
            </div>

            {/* Step Five */}
            <div className="absolute bottom-0 left-0 md:bottom-8 md:left-8 lg:bottom-16 lg:left-16 xl:bottom-24 xl:left-24 w-48 sm:w-64 md:w-72 lg:w-80">
              <div className="mt-4 flex items-start">
                <img
                  src={`/images/line5.png`}
                  alt='line'
                  width={240}
                  height={240}
                  className="object-contain opacity-60 ml-10"
                />
              </div>
              <StepTitle number={stepFive.stepNumber} fallback="Five" />
              <p className="text-taupe font-light text-sm leading-relaxed">
                {stepFive.stepDescription || 'No description available for step five.'}
              </p>
            </div>

            {/* Step Six */}
            <div className="absolute bottom-0 right-0 md:bottom-8 md:right-8 lg:bottom-16 lg:right-16 xl:bottom-24 xl:right-24 w-48 sm:w-64 md:w-72 lg:w-80 text-right">
              <div className="mt-4 flex items-start justify-end">
                <img
                  src={`/images/line6.png`}
                  alt='line'
                  width={240}
                  height={240}
                  className="object-contain opacity-60 mr-10"
                />
              </div>
              <StepTitle number={stepSix.stepNumber} fallback="Six" />
              <p className="text-taupe font-light text-sm leading-relaxed">
                {stepSix.stepDescription || 'No description available for step six.'}
              </p>
            </div>

          </div>
        </div>

        {/* Mobile Layout - Vertical Steps */}
        <div className="lg:hidden mt-12 space-y-8">
          {processSteps.map((step, index) => {
            const { stepNumber, stepDescription } = step;
            return (
              <div key={index} className="bg-ink-soft/60 border border-ivory/10 rounded-2xl p-6">
                <h3 className="font-display text-2xl text-ivory mb-3">
                  <span className="text-champagne italic">Step</span> {stepNumber || 'Step'}
                </h3>
                <p className="text-taupe font-light text-base leading-relaxed">
                  {stepDescription || 'No description available for this step.'}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


