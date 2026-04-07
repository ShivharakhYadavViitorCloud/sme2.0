import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import HeroSection from '@site/src/components/Landing/HeroSection';
import ValueProps from '@site/src/components/Landing/ValueProps';
import FeaturesGrid from '@site/src/components/Landing/FeaturesGrid';
import CliExperience from '@site/src/components/Landing/CliExperience';
import HowItWorks from '@site/src/components/Landing/HowItWorks';
import TargetUsers from '@site/src/components/Landing/TargetUsers';
import ComparisonTable from '@site/src/components/Landing/ComparisonTable';
import FinalCta from '@site/src/components/Landing/FinalCta';

export default function Home(): ReactNode {
  return (
    <Layout
      title="Zero-config code quality"
      description="lint-sage sets up ESLint, Prettier, Husky, Commitlint and more with a single CLI command. No config files to write.">
      <HeroSection />
      <main>
        <ValueProps />
        <FeaturesGrid />
        <CliExperience />
        <HowItWorks />
        <TargetUsers />
        <ComparisonTable />
      </main>
      <FinalCta />
    </Layout>
  );
}
