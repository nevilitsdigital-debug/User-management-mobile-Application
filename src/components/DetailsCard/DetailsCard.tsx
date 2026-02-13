import React from 'react';
import { View, Text } from 'react-native';
import styles from './DetailsCard.styles';

interface DetailsCardProps {
  title: string;
  data: any;
}

const DetailsCard: React.FC<DetailsCardProps> = ({ title, data }) => {
  if (!data || typeof data !== 'object') return null;

  const renderNestedValue = (value: any, depth: number = 0): string => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        return value.join(', ');
      }
      return Object.entries(value)
        .map(([k, v]) => {
          const formattedKey = k
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str) => str.toUpperCase())
            .trim();
          if (typeof v === 'object' && v !== null) {
            return `${formattedKey}: ${renderNestedValue(v, depth + 1)}`;
          }
          return `${formattedKey}: ${v}`;
        })
        .join('; ');
    }
    return String(value);
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {Object.entries(data).map(([key, value]) => {
        if (value === null || value === undefined || value === '') return null;
        const formattedKey = key
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, (str) => str.toUpperCase())
          .trim();
        return (
          <View key={key} style={styles.detailRow}>
            <Text style={styles.detailLabel}>{formattedKey}</Text>
            <Text style={styles.detailValue}>
              {renderNestedValue(value)}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default DetailsCard;

