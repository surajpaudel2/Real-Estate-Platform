const ContinueWith: React.FC = () => {
  return (
    <div className="relative flex items-center py-2">
      <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
      <span className="mx-4 flex-shrink text-xs text-gray-500 dark:text-gray-400">
        or continue with
      </span>
      <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
    </div>
  );
};

export default ContinueWith;
