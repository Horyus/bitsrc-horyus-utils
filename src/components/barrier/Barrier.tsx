import * as React from 'react';
import * as _ from 'lodash';

interface IDeepDefProps {
    value: any;
    branches?: (IDeepDefProps | string)[];
}

interface IBarrierProps {
    ifDef?: any;
    ifDeepDef?: IDeepDefProps;
}

/**
 * The Barrier is used to render children only if element exists. Use ifDef prop to check multiple values. Use ifDeepDef prop for complexe objects.
 *
 */
class Barrier extends React.Component<IBarrierProps> {

    public render(): React.ReactNode {
        const render = this.ifDef_check() || this.ifDeepDef_check();
        if (render) {
            return (this.props.children);
        }
        return null;
    }

    private ifDef_check(): boolean {
        if (this.props.ifDef) {

            if (_.isArray(this.props.ifDef)) {

                for (const element of this.props.ifDef) {
                    if (element === undefined || element === null) return false;
                }

                return true;

            } else {

                return true;

            }

        }
        return false;
    }

    private check_elem(elem: any, branches?: (IDeepDefProps | string)[]): boolean {
        if (!elem) return false;
        if (branches) {
            for (let branch_check of branches) {

                if (_.isObjectLike(branch_check)) {

                    branch_check = branch_check as IDeepDefProps;

                    if (!_.isString(branch_check.value)) {
                        throw new Error('Invalid Deep Def configuration');
                    }

                    if (!elem[branch_check.value]) return false;

                    if (!this.check_elem(elem[branch_check.value], branch_check.branches)) return false;

                } else if (_.isString(branch_check)) {

                    branch_check = branch_check as string;

                    if (!elem[branch_check]) return false;

                } else {

                    throw new Error('Invalid Deep Def configuration');

                }

            }
        }
        return true;
    }

    private ifDeepDef_check(): boolean {
        if (this.props.ifDeepDef) {

            return this.check_elem(this.props.ifDeepDef.value, this.props.ifDeepDef.branches);

        }

        return false;
    }

}

export default Barrier;
