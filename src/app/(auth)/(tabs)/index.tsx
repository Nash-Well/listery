import { useClerk } from '@clerk/clerk-expo';

import { 
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

export default function TabOneScreen() {
  const { signOut } = useClerk();

  return (
    <View className='flex-1 justify-center items-center'>
      <TouchableOpacity onPress={ () => signOut() }>
        <Text>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}