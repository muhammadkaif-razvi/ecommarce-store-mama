import { Check } from 'lucide-react'; // If using lucide-react with Shadcn UI

interface StatusItemProps {
  title: string;
  status: 'completed' | 'in_progress' | 'not_started';
}

const StatusItem: React.FC<StatusItemProps> = ({ title, status }) => {
  return (
    <div className="flex items-center py-4 space-x-3 border-gray-200 dark:border-gray-700">
      <div className="relative">
        {status === 'completed' && (
          <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
            <Check className="w-4 h-4 text-green-500" />
          </div>
        )}
        {status === 'in_progress' && (
          <div className="w-10 h-10 rounded-full border border-blue-500 bg-blue-500 text-blue-500 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full animate-pulse bg-white"></div> {/* Optional pulsing effect */}
          </div>
        )}
        {status === 'not_started' && (
          <div className="w-10 h-10 rounded-full border border-gray-400 dark:border-gray-600 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-gray-400 dark:bg-gray-600"></div> {/* Optional filled circle */}
          </div>
        )}
      </div>
      <div>
        <h3 className="font-medium text-gray-900 dark:text-gray-100">{title}</h3>
        <p className={`text-sm ${
          status === 'completed' ? 'text-green-500' :
          status === 'in_progress' ? 'text-blue-500' :
          'text-gray-500 dark:text-gray-400'
        }`}>
          {status === 'completed' ? 'Completed' :
           status === 'in_progress' ? 'In Progress' :
           'Not Started'}
        </p>
      </div>
    </div>
  );
};

interface StatusListProps {
  items: { title: string; status: 'completed' | 'in_progress' | 'not_started' }[];
}

const StatusList: React.FC<StatusListProps> = ({ items }) => {
  return (
   <>
      {items.map((item, index) => (
        <StatusItem key={index} {...item} />
      ))}
   </>
  );
};
export default StatusList

