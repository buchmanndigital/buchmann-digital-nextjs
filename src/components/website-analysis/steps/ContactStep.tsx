import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { slideVariants } from '../constants';
import { FormData } from '../types';

interface ContactStepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

export function ContactStep({ formData, setFormData }: ContactStepProps) {
  return (
    <motion.div
      key="step5"
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="space-y-6"
    >
      <div>
        <label className="block text-lg font-medium mb-2">Name</label>
        <Input
          type="text"
          placeholder="Ihr Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-3 text-lg"
        />
      </div>
      <div>
        <label className="block text-lg font-medium mb-2">E-Mail</label>
        <Input
          type="email"
          placeholder="ihre@email.de"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-3 text-lg"
        />
      </div>
      <div>
        <label className="block text-lg font-medium mb-2">
          Telefon <span className="text-sm text-gray-500">(optional)</span>
        </label>
        <Input
          type="tel"
          placeholder="+49 123 45678900"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full p-3 text-lg"
        />
      </div>
    </motion.div>
  );
}