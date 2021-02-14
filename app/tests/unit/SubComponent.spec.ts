import { shallowMount, mount } from '@vue/test-utils'
import SubComponent from '@/components/SubComponent.vue'
import Vue from 'vue'

describe('SubComponent.vue', () => {

    it('should call $emit', () => {
        const wrapper = mount(SubComponent, {
            propsData: {
                nameVal: 'Stew',
                someProp: 233
            }
        })
        const emitName = wrapper.emitted('update:name')
        let emitNameVal: string = ''
        if (emitName?.length && emitName[0].length) {
            emitNameVal = emitName[0][0]
        }
        const emitDesc = wrapper.emitted('update:description')
        const emitBool = wrapper.emitted('update:showImg')
        let emitBoolVal: boolean = false
        if (emitBool?.length && emitBool[0].length) {
            emitBoolVal = emitBool[0][0]
        }

        expect(emitNameVal).toBe("Stew")
        expect(emitDesc?.toString()).toMatch(/starfox/gi)
        expect(emitBoolVal).toBe(true)
        expect(wrapper.props()).toHaveProperty('nameVal')
        expect(wrapper.props().nameVal).toBe('Stew')
        expect(wrapper.props().someProp).toBe(233)
    })

})
