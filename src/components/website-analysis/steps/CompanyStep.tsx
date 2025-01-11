import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { slideVariants } from '../constants';
import { FormData } from '../types';

interface CompanyStepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

export function CompanyStep({ formData, setFormData }: CompanyStepProps) {
  return (
    <motion.div
      key="step4"
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="space-y-6"
    >
      <div>
        <label className="block text-lg font-medium mb-2">Website URL</label>
        <Input
          type="url"
          placeholder="www.ihre-website.de"
          value={formData.websiteUrl}
          onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
          className="w-full p-3 text-lg"
        />
      </div>
      <div>
        <label className="block text-lg font-medium mb-2">Unternehmen</label>
        <Input
          type="text"
          placeholder="Ihr Unternehmen"
          value={formData.companyName}
          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
          className="w-full p-3 text-lg"
        />
      </div>
      <div>
        <label className="block text-lg font-medium mb-2">Branche</label>
        <Input
          type="text"
          placeholder="Ihre Branche"
          value={formData.industry}
          onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
          className="w-full p-3 text-lg"
        />
      </div>
    </motion.div>
  );
}