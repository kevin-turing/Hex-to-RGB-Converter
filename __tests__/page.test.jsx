import { render, screen, fireEvent } from '@testing-library/react';
import HexToRgbConverter from '../app/components/HEX-to-RGB';


describe('HexToRgbConverter', () => {

    it('should handle hex color codes with or without the # symbol (Requirement 1, Assumption 1)', () => {
        render(<HexToRgbConverter />);
        const input = screen.getByLabelText('Hex Code:');
        fireEvent.change(input, { target: { value: 'ffffff' } });  // Without #
        expect(screen.getByText('RGB: rgb(255, 255, 255)')).toBeInTheDocument();

        fireEvent.change(input, { target: { value: '#ffffff' } }); // With #
        expect(screen.getByText('RGB: rgb(255, 255, 255)')).toBeInTheDocument();


        fireEvent.change(input, { target: { value: '123' } });  // Without #, shorthand
        expect(screen.getByText('RGB: rgb(17, 34, 51)')).toBeInTheDocument();

        fireEvent.change(input, { target: { value: '#123' } }); // With #, shorthand
        expect(screen.getByText('RGB: rgb(17, 34, 51)')).toBeInTheDocument();



    });




    it('should validate input and display an error for invalid hex codes (Requirement 2, Assumption 2)', () => {
        render(<HexToRgbConverter />);
        const input = screen.getByLabelText('Hex Code:');
        fireEvent.change(input, { target: { value: 'ZZZ' } });
        expect(screen.getByText('Invalid hex code')).toBeVisible();

        fireEvent.change(input, { target: { value: '#GGGGGG' } }); // Invalid characters
        expect(screen.getByText('Invalid hex code')).toBeVisible();

        //Check if RGB is cleared after invalid input
        expect(screen.queryByText(/RGB: rgb\(\d+, \d+, \d+\)/)).toBeNull(); //rgb text should be removed

        fireEvent.change(input, { target: { value: '#12345' } }); // Invalid length
        expect(screen.getByText('Invalid hex code')).toBeVisible();
    });



    it('should convert valid hex codes to RGB (Requirement 3, Assumption 3)', () => {
        render(<HexToRgbConverter />);
        const input = screen.getByLabelText('Hex Code:');
        fireEvent.change(input, { target: { value: '#000000' } });
        expect(screen.getByText('RGB: rgb(0, 0, 0)')).toBeInTheDocument();


        fireEvent.change(input, { target: { value: '#FF0000' } });
        expect(screen.getByText('RGB: rgb(255, 0, 0)')).toBeInTheDocument();



        fireEvent.change(input, { target: { value: '#00FF00' } });
        expect(screen.getByText('RGB: rgb(0, 255, 0)')).toBeInTheDocument();

        fireEvent.change(input, { target: { value: '#0000FF' } });
        expect(screen.getByText('RGB: rgb(0, 0, 255)')).toBeInTheDocument();


    });



    it('should display the RGB equivalent (Requirement 4, Assumption 4)', () => {
        render(<HexToRgbConverter />);
        const input = screen.getByLabelText('Hex Code:');
        fireEvent.change(input, { target: { value: '#abcdef' } });
        expect(screen.getByText('RGB: rgb(171, 205, 239)')).toBeVisible();//rgb is visible and accessible

    });


    it('should handle both 3 and 6 digit hex codes (Requirement 5, Assumption 5)', () => {
        render(<HexToRgbConverter />);
        const input = screen.getByLabelText('Hex Code:');

        fireEvent.change(input, { target: { value: '#123' } });
        expect(screen.getByText('RGB: rgb(17, 34, 51)')).toBeInTheDocument();


        fireEvent.change(input, { target: { value: '#112233' } }); // 6-digit
        expect(screen.getByText('RGB: rgb(17, 34, 51)')).toBeInTheDocument();
    });


    //Accessibility test (Requirements 6, 8, 9; Assumptions 6, 8, 9)
    it('should be keyboard accessible (Requirements 6, 8; Assumptions 6, 8)', () => {
        render(<HexToRgbConverter />);
        const input = screen.getByLabelText('Hex Code:');
        expect(input).toBeVisible();
        input.focus();  //Focus the input using keyboard
        fireEvent.keyDown(input, { key: "Tab" });


    });


    it('should sanitize input to prevent vulnerabilities (Requirement 7, Assumption 7)', () => {

        render(<HexToRgbConverter />);
        const input = screen.getByLabelText('Hex Code:');
        fireEvent.change(input, { target: { value: '<script>alert("XSS")</script>' } }); // Simulate an XSS attack
        expect(screen.queryByText('Invalid hex code')).toBeVisible(); //Shouldnt execute the script, rather display an error


    });



    it('input fields and buttons should have labels for screen readers (Requirement 9, Assumption 9)', () => {

        render(<HexToRgbConverter />);

        const input = screen.getByLabelText('Hex Code:');
        expect(input).toHaveAttribute('id', 'hexInput'); // Input has a corresponding label
    });



    it('should ignore whitespaces in input (Requirement 10, Assumption 10)', () => {
        render(<HexToRgbConverter />);
        const input = screen.getByLabelText('Hex Code:');

        fireEvent.change(input, { target: { value: ' #ffffff ' } }); // Leading and trailing spaces
        expect(screen.getByText('RGB: rgb(255, 255, 255)')).toBeInTheDocument();

        fireEvent.change(input, { target: { value: '  #123   ' } }); // Leading and trailing spaces, shorthand
        expect(screen.getByText('RGB: rgb(17, 34, 51)')).toBeInTheDocument();


    });




});


