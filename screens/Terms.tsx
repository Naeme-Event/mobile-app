import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {RootStackScreenProps} from '../types/types';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';

export default function Terms({}: RootStackScreenProps<'Terms'>) {
  let route;
  const navigation = useNavigation();
  return (
    <ScrollView className="min-h-screen px-5 bg-white py-10">
      {/* 
      // @ts-ignore */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="h-10 w-10 bg-gray-200 mb-4 items-center justify-center rounded-full">
        <Icon name="arrowleft" size={24} color="#111111" />
      </TouchableOpacity>
      <Text
        style={{
          fontFamily: 'Montserrat-Black',
        }}
        className="text-xl text-center text-black">
        Naeme Events Terms and Conditions of Use
      </Text>
      <Text
        style={{
          fontFamily: 'Montserrat-SemiBold',
        }}
        className="text-sm text-gray-800 my-3">
        Welcome to Naeme Events! These Terms and Conditions of Use govern your
        access to and use of the Naeme Events platform and services. Please read
        these Terms carefully before using our platform. By accessing or using
        the Services, you agree to be bound by these Terms. If you do not agree
        to these Terms, you may not use the Services.
      </Text>
      <Text
        className="text-orange-400 text-lg"
        style={{
          fontFamily: 'Montserrat-Bold',
        }}>
        General Terms
      </Text>
      <Text
        className="text-gray-500 text-xs my-2"
        style={{
          fontFamily: 'Montserrat-Regular',
        }}>
        1.1 Eligibility: You must be at least 18 years old and have the legal
        capacity to enter into a binding agreement to use our Services. By using
        the Services, you represent and warrant that you meet these
        requirements.
      </Text>
      <Text
        className="text-gray-500 text-xs my-2"
        style={{
          fontFamily: 'Montserrat-Regular',
        }}>
        1.2 Account Creation: To access certain features of the Services, you
        may need to create an account. You agree to provide accurate and
        complete information during the registration process and to keep your
        account credentials confidential. You are responsible for all activities
        that occur under your account.
      </Text>
      <Text
        className="text-gray-500 text-xs my-2"
        style={{
          fontFamily: 'Montserrat-Regular',
        }}>
        1.3 Prohibited Activities: You agree not to engage in any prohibited
        activities while using the Services, including but not limited to: a)
        Violating any applicable laws or regulations; b) Impersonating any
        person or entity or falsely stating or otherwise misrepresenting your
        affiliation with a person or entity; c) Interfering with or disrupting
        the Services or servers or networks connected to the Services; d)
        Uploading, posting, transmitting, or distributing any content that is
        unlawful, harmful, defamatory, obscene, or otherwise objectionable; e)
        Engaging in any activity that may damage, disable, or overburden our
        servers or networks, or interfere with any other party's use and
        enjoyment of the Services.
      </Text>
      <Text
        className="text-orange-400 text-lg"
        style={{
          fontFamily: 'Montserrat-Bold',
        }}>
        Organizers' Responsibilities and Use of Services
      </Text>
      <Text
        className="text-gray-500 text-xs my-2"
        style={{
          fontFamily: 'Montserrat-Regular',
        }}>
        2.1 Event Creation and Promotion: As an event organizer, you are
        responsible for creating and promoting your events on our platform. You
        must provide accurate and complete information about your events,
        including event title, date, time, location, and description. You are
        also responsible for setting ticket prices and any additional fees or
        charges.
      </Text>
      <Text
        className="text-gray-500 text-xs my-2"
        style={{
          fontFamily: 'Montserrat-Regular',
        }}>
        2.2 Ticket Sales and Attendee Management: Naeme Events provides tools
        for selling tickets and managing attendees. You are responsible for
        ensuring the accuracy of ticket information and for delivering the event
        as described. You must promptly respond to attendee inquiries and
        provide any necessary support before, during, and after the event.
      </Text>
      <Text
        className="text-gray-500 text-xs my-2"
        style={{
          fontFamily: 'Montserrat-Regular',
        }}>
        2.3 Revenue Streams: Naeme Events provides multiple revenue streams for
        event organizers, including ticket fees, service fees, and merchandise
        sales. You agree to abide by the pricing and revenue-sharing terms
        outlined in your agreement with Naeme Events.
      </Text>
      <Text
        className="text-gray-500 text-xs my-2"
        style={{
          fontFamily: 'Montserrat-Regular',
        }}>
        2.4 Affiliate Program: You may participate in Naeme Events' affiliate
        program to promote your events and earn commissions on ticket sales. You
        agree to comply with the terms and conditions of the affiliate program
        and not engage in any fraudulent or deceptive practices.
      </Text>
      <Text
        className="text-gray-500 text-xs my-2"
        style={{
          fontFamily: 'Montserrat-Regular',
        }}>
        2.5 Virtual Events: Naeme Events offers a platform for hosting virtual
        events. If you choose to host virtual events, you are responsible for
        ensuring a seamless online experience, including providing access
        instructions, managing virtual event platforms, and addressing technical
        issues.
      </Text>
      <Text
        className="text-gray-500 text-xs my-2"
        style={{
          fontFamily: 'Montserrat-Regular',
        }}>
        2.6 Compliance with Laws: As an event organizer, you are solely
        responsible for complying with all applicable laws and regulations,
        including but not limited to event permits, licenses, and tax
        obligations.
      </Text>
      <Text
        className="text-orange-400 text-lg"
        style={{
          fontFamily: 'Montserrat-Bold',
        }}>
        Attendees' Responsibilities and Use of Services
      </Text>
      <Text
        className="text-gray-500 text-xs my-2"
        style={{
          fontFamily: 'Montserrat-Regular',
        }}>
        3.1 Ticket Purchase: As an attendee, you may purchase tickets for events
        through Naeme Events. You agree to provide accurate and complete
        information during the ticket purchase process and to comply with any
        additional terms and conditions set by the event organizer.
      </Text>
      <Text
        className="text-gray-500 text-xs my-2"
        style={{
          fontFamily: 'Montserrat-Regular',
        }}>
        3.2 Ticket Validity and Authentication: Upon purchasing a ticket, you
        will receive an email confirmation and a mobile ticket. You must present
        a valid ticket at the event for admission. Naeme Events may provide
        tools for organizers to validate ticket authenticity, such as a QR code
        scanning system. As an attendee, you agree to cooperate with event
        organizers and Naeme Events staff in the ticket validation process and
        provide any necessary identification or proof of purchase.
      </Text>
      <Text
        className="text-gray-500 text-xs my-2"
        style={{
          fontFamily: 'Montserrat-Regular',
        }}>
        3.3 Prohibited Activities: As an attendee, you agree not to engage in
        any prohibited activities while using the Services, including but not
        limited to:
      </Text>
      <Text
        className="text-gray-500 text-xs my-2"
        style={{
          fontFamily: 'Montserrat-Regular',
        }}>
        a) Attempting to gain unauthorized access to event areas, systems, or
        data; b) Disrupting or interfering with the event or other attendees'
        experience; c) Engaging in any behavior that is unlawful, harmful,
        defamatory, obscene, or otherwise objectionable.
      </Text>
      <Text
        className="text-orange-400 text-lg"
        style={{
          fontFamily: 'Montserrat-Bold',
        }}>
        Intellectual Property
      </Text>
      <Text
        className="text-gray-500 text-xs my-2"
        style={{
          fontFamily: 'Montserrat-Regular',
        }}>
        4.1 Ownership: Naeme Events and its licensors own all intellectual
        property rights in the Services, including but not limited to
        trademarks, logos, copyrights, and trade secrets. You may not use, copy,
        reproduce, modify, or distribute any content from the Services without
        prior written permission.
      </Text>
      <Text
        className="text-gray-500 text-xs my-2"
        style={{
          fontFamily: 'Montserrat-Regular',
        }}>
        4.2 User-Generated Content: By using the Services, you grant Naeme
        Events a non-exclusive, worldwide, royalty-free, sublicensable, and
        transferable license to use, display, reproduce, distribute, modify, and
        create derivative works of any content you upload or provide through the
        Services. You represent and warrant that you have the necessary rights
        to grant this license.
      </Text>
      <Text
        className="text-orange-400 text-lg"
        style={{
          fontFamily: 'Montserrat-Bold',
        }}>
        Privacy
      </Text>
      <Text
        className="text-gray-500 text-xs my-2"
        style={{
          fontFamily: 'Montserrat-Regular',
        }}>
        5.1 Data Collection: Naeme Events collects and processes personal
        information in accordance with its Privacy Policy. By using the
        Services, you consent to the collection, use, and sharing of your
        personal information as described in the Privacy Policy.
      </Text>
      <Text
        className="text-gray-500 text-xs my-2"
        style={{
          fontFamily: 'Montserrat-Regular',
        }}>
        5.2 Communication: By using the Services, you agree to receive
        communications from Naeme Events, event organizers, and affiliates
        related to your use of the Services and attendance at events. You may
        opt out of receiving certain communications by adjusting your account
        settings or following the instructions provided in the communications.
      </Text>
      <Text
        className="text-orange-400 text-lg"
        style={{
          fontFamily: 'Montserrat-Bold',
        }}>
        Disclaimer of Warranties
      </Text>
      <Text
        className="text-gray-500 text-xs my-2"
        style={{
          fontFamily: 'Montserrat-Regular',
        }}>
        6.1 The Services are provided on an "as is" and "as available" basis.
        Naeme Events makes no representations or warranties of any kind, express
        or implied, regarding the Services, including but not limited to the
        accuracy, reliability, availability, or suitability for a particular
        purpose.
      </Text>
      <Text
        className="text-gray-500 text-xs my-2"
        style={{
          fontFamily: 'Montserrat-Regular',
        }}>
        6.2 Naeme Events does not guarantee the accuracy, quality, legality, or
        safety of events hosted on its platform. Event organizers are solely
        responsible for the events they create and deliver.
      </Text>
      <Text
        className="text-orange-400 text-lg"
        style={{
          fontFamily: 'Montserrat-Bold',
        }}>
        Limitation of Liability
      </Text>
      <Text
        className="text-gray-500 text-xs my-2"
        style={{
          fontFamily: 'Montserrat-Regular',
        }}>
        7.1 To the maximum extent permitted by applicable law, Naeme Events and
        its affiliates, officers, directors, employees, and agents shall not be
        liable for any indirect, incidental, special, consequential, or
        exemplary damages, including but not limited to loss of profits, data,
        or goodwill.
      </Text>
      <Text
        className="text-gray-500 text-xs my-2"
        style={{
          fontFamily: 'Montserrat-Regular',
        }}>
        7.2 Naeme Events' total liability for any claims arising out of or in
        connection with the Services shall not exceed the fees paid by you, if
        any, for the use of the Services in the twelve (12) months preceding the
        claim.
      </Text>
      <Text
        className="text-orange-400 text-lg"
        style={{
          fontFamily: 'Montserrat-Bold',
        }}>
        Conclusion
      </Text>
      <View className="my-1" />
      <Text
        className="text-gray-500 text-xs my-10"
        style={{
          fontFamily: 'Montserrat-Regular',
        }}>
        Indemnification You agree to indemnify, defend, and hold harmless Naeme
        Events and its affiliates, officers, directors, employees, and agents
        from any claims, liabilities, damages, losses, costs, or expenses
        arising out of or in connection with your use of the Services, violation
        of these Terms, or infringement of any third-party rights.{' '}
        <View className="my-2 block" />
        Modifications to the Terms Naeme Events reserves the right to modify or
        update these Terms at any time. <View className="my-1 " />
        If we make material changes, we will provide notice through the Services
        or by other means. <View className="my-1" />
        Your continued use of the Services after the effective date of the
        revised Terms constitutes your acceptance of the changes.{' '}
        <View className="my-1" />
      </Text>
    </ScrollView>
  );
}
